'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveGrade(formData: {
  id?: string;
  studentId: string;
  subjectId: string;
  grade: number;
  term: string;
  weight: number;
  description?: string;
}) {
  const { id, studentId, subjectId, grade, term, weight, description } = formData;

  // Validation
  if (!studentId || !subjectId || !term) {
    return { error: 'Faltan campos obligatorios para guardar la calificación.' };
  }

  if (grade < 0 || grade > 20) {
    return { error: 'La calificación debe estar comprendida entre 0.00 y 20.00.' };
  }

  if (weight <= 0 || weight > 100) {
    return { error: 'El peso de la evaluación debe estar entre 0.01% y 100%.' };
  }

  try {
    const supabase = await createClient();

    // Verify requesting user is teacher or admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'No autorizado. Inicie sesión.' };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const role = profile?.role;
    if (role !== 'teacher' && role !== 'admin') {
      return { error: 'Operación denegada. Solo docentes y administradores pueden modificar calificaciones.' };
    }

    // Check if grade already exists for this student, subject, and term (if id is not provided)
    if (!id) {
      const { data: existingGrade } = await supabase
        .from('grades')
        .select('id')
        .eq('student_id', studentId)
        .eq('subject_id', subjectId)
        .eq('term', term)
        .maybeSingle();

      if (existingGrade) {
        // Update existing instead of creating a duplicate
        const { error: updateError } = await supabase
          .from('grades')
          .update({
            grade,
            weight,
            description,
            graded_by: user.id,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingGrade.id);

        if (updateError) {
          return { error: `Error al actualizar la calificación: ${updateError.message}` };
        }
      } else {
        // Insert new
        const { error: insertError } = await supabase.from('grades').insert({
          student_id: studentId,
          subject_id: subjectId,
          grade,
          term,
          weight,
          description,
          graded_by: user.id,
        });

        if (insertError) {
          return { error: `Error al registrar la calificación: ${insertError.message}` };
        }
      }
    } else {
      // Update by direct ID
      const { error: updateError } = await supabase
        .from('grades')
        .update({
          grade,
          weight,
          description,
          graded_by: user.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (updateError) {
        return { error: `Error al guardar los cambios: ${updateError.message}` };
      }
    }

    revalidatePath('/dashboard/teacher');
    return { success: true };
  } catch (err: any) {
    return { error: err?.message || 'Ocurrió un error inesperado al procesar la operación.' };
  }
}

export async function deleteGrade(gradeId: string) {
  if (!gradeId) {
    return { error: 'ID de calificación inválido.' };
  }

  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'No autorizado.' };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const role = profile?.role;
    if (role !== 'teacher' && role !== 'admin') {
      return { error: 'Acceso denegado.' };
    }

    const { error } = await supabase.from('grades').delete().eq('id', gradeId);

    if (error) {
      return { error: `Error al eliminar: ${error.message}` };
    }

    revalidatePath('/dashboard/teacher');
    return { success: true };
  } catch (err: any) {
    return { error: err?.message || 'Ocurrió un error al intentar eliminar la calificación.' };
  }
}

export async function saveLibraryResource(formData: {
  title: string;
  description?: string;
  fileUrl: string;
  subjectId: string;
}) {
  const { title, description, fileUrl, subjectId } = formData;

  if (!title || !fileUrl || !subjectId) {
    return { error: 'Faltan campos obligatorios para guardar el recurso de biblioteca.' };
  }

  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'No autorizado. Inicie sesión.' };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'teacher' && profile?.role !== 'admin') {
      return { error: 'Acceso denegado. Solo docentes y administradores pueden guardar recursos.' };
    }

    const { error } = await supabase.from('library_resources').insert({
      title,
      description,
      file_url: fileUrl,
      subject_id: subjectId,
      teacher_id: user.id,
    });

    if (error) {
      return { error: `Error al guardar metadatos en la base de datos: ${error.message}` };
    }

    revalidatePath('/dashboard/teacher/library');
    return { success: true };
  } catch (err: any) {
    return { error: err?.message || 'Ocurrió un error inesperado al procesar la operación.' };
  }
}

export async function deleteLibraryResource(resourceId: string, fileUrl: string) {
  if (!resourceId || !fileUrl) {
    return { error: 'Datos de recurso no válidos.' };
  }

  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'No autorizado.' };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'teacher' && profile?.role !== 'admin') {
      return { error: 'Acceso denegado.' };
    }

    // 1. Delete from PostgreSQL metadata table
    const { error: dbError } = await supabase
      .from('library_resources')
      .delete()
      .eq('id', resourceId);

    if (dbError) {
      return { error: `Error al eliminar de la base de datos: ${dbError.message}` };
    }

    // 2. Extract file path from URL and delete from storage
    try {
      const urlParts = fileUrl.split('/');
      const filePath = urlParts[urlParts.length - 1];
      if (filePath) {
        await supabase.storage.from('virtual_library').remove([filePath]);
      }
    } catch (storageErr) {
      console.error('Error removing file from storage:', storageErr);
      // We don't fail the action if storage cleanup fails but DB delete succeeded
    }

    revalidatePath('/dashboard/teacher/library');
    return { success: true };
  } catch (err: any) {
    return { error: err?.message || 'Ocurrió un error inesperado.' };
  }
}

export async function requestAppointment(formData: {
  targetUserId: string;
  date: string;
  time: string;
  reason: string;
}) {
  const { targetUserId, date, time, reason } = formData;

  if (!targetUserId || !date || !time || !reason) {
    return { error: 'Por favor complete todos los campos requeridos.' };
  }

  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'No autorizado. Inicie sesión.' };
    }

    // Fetch Representative Profile for notification details
    const { data: repProfile } = await supabase
      .from('profiles')
      .select('first_name, last_name, role')
      .eq('id', user.id)
      .single();

    if (repProfile?.role !== 'representative') {
      return { error: 'Solo representantes registrados pueden solicitar citas.' };
    }

    // 1. Insert appointment
    const { data: newAppt, error: apptError } = await supabase
      .from('appointments')
      .insert({
        representative_id: user.id,
        target_user_id: targetUserId,
        appointment_date: date,
        appointment_time: time,
        status: 'pending',
        reason: reason,
      })
      .select('id')
      .single();

    if (apptError) {
      return { error: `Error al registrar la cita: ${apptError.message}` };
    }

    // 2. Create notification for the teacher/admin
    const { error: notifError } = await supabase.from('notifications').insert({
      user_id: targetUserId,
      title: 'Nueva Solicitud de Cita',
      message: `El representante ${repProfile.first_name} ${repProfile.last_name} solicita una cita para el ${date} a las ${time}. Motivo: ${reason}`,
      type: 'academic',
    });

    if (notifError) {
      console.error('Error creating notification for appointment host:', notifError);
    }

    revalidatePath('/dashboard/representative/appointments');
    return { success: true };
  } catch (err: any) {
    return { error: err?.message || 'Error al procesar la solicitud de cita.' };
  }
}

export async function updateAppointmentStatus(
  appointmentId: string,
  status: 'approved' | 'rejected' | 'completed',
  notes?: string
) {
  if (!appointmentId || !status) {
    return { error: 'Parámetros inválidos.' };
  }

  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'No autorizado.' };
    }

    // Verify host role (must be teacher or admin)
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, first_name, last_name')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'teacher' && profile?.role !== 'admin') {
      return { error: 'Operación no autorizada.' };
    }

    // Get current appointment information to notify the representative
    const { data: appt, error: fetchError } = await supabase
      .from('appointments')
      .select('representative_id, appointment_date, appointment_time')
      .eq('id', appointmentId)
      .single();

    if (fetchError || !appt) {
      return { error: 'No se encontró la cita especificada.' };
    }

    // 1. Update appointment status & notes
    const { error: updateError } = await supabase
      .from('appointments')
      .update({
        status,
        notes,
        updated_at: new Date().toISOString(),
      })
      .eq('id', appointmentId);

    if (updateError) {
      return { error: `Error al actualizar la cita: ${updateError.message}` };
    }

    // 2. Notify Representative
    const statusText = status === 'approved' ? 'Aprobada' : status === 'rejected' ? 'Rechazada' : 'Completada';
    const hostName = `${profile.first_name} ${profile.last_name}`;

    const { error: notifError } = await supabase.from('notifications').insert({
      user_id: appt.representative_id,
      title: `Cita ${statusText}`,
      message: `Su reunión del ${appt.appointment_date} a las ${appt.appointment_time} con ${hostName} ha sido ${statusText.toLowerCase()}.${
        notes ? ` Nota: ${notes}` : ''
      }`,
      type: 'academic',
    });

    if (notifError) {
      console.error('Error creating notification for representative:', notifError);
    }

    revalidatePath('/dashboard/teacher/appointments');
    revalidatePath('/dashboard/admin/appointments');
    return { success: true };
  } catch (err: any) {
    return { error: err?.message || 'Error al procesar la actualización de la cita.' };
  }
}

export async function createAnnouncement(formData: {
  title: string;
  content: string;
  targetRole: 'all' | 'admin' | 'teacher' | 'student' | 'representative';
}) {
  const { title, content, targetRole } = formData;

  if (!title || !content || !targetRole) {
    return { error: 'Faltan campos obligatorios para guardar el anuncio.' };
  }

  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'No autorizado. Inicie sesión.' };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const role = profile?.role;
    if (role !== 'teacher' && role !== 'admin') {
      return { error: 'Acceso denegado.' };
    }

    // Teachers can only publish to students or representatives
    if (role === 'teacher' && targetRole !== 'student' && targetRole !== 'representative') {
      return { error: 'Los docentes solo pueden publicar anuncios a Estudiantes o Representantes.' };
    }

    const { error } = await supabase.from('announcements').insert({
      title,
      content,
      target_role: targetRole,
      author_id: user.id,
    });

    if (error) {
      return { error: `Error al crear el anuncio: ${error.message}` };
    }

    revalidatePath('/dashboard/teacher');
    revalidatePath('/dashboard/student');
    revalidatePath('/dashboard/representative');
    return { success: true };
  } catch (err: any) {
    return { error: err?.message || 'Ocurrió un error al procesar el anuncio.' };
  }
}

export async function updateAnnouncement(formData: {
  id: string;
  title: string;
  content: string;
  targetRole: 'all' | 'admin' | 'teacher' | 'student' | 'representative';
}) {
  const { id, title, content, targetRole } = formData;

  if (!id || !title || !content || !targetRole) {
    return { error: 'Faltan campos obligatorios.' };
  }

  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'No autorizado.' };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const role = profile?.role;
    if (role !== 'teacher' && role !== 'admin') {
      return { error: 'Acceso denegado.' };
    }

    if (role === 'teacher' && targetRole !== 'student' && targetRole !== 'representative') {
      return { error: 'Rango de audiencia no permitido.' };
    }

    // Verify ownership or admin
    const { data: existing } = await supabase
      .from('announcements')
      .select('author_id')
      .eq('id', id)
      .single();

    if (existing?.author_id !== user.id && role !== 'admin') {
      return { error: 'No está autorizado para editar este anuncio.' };
    }

    const { error } = await supabase
      .from('announcements')
      .update({
        title,
        content,
        target_role: targetRole,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      return { error: `Error al actualizar: ${error.message}` };
    }

    revalidatePath('/dashboard/teacher');
    revalidatePath('/dashboard/student');
    revalidatePath('/dashboard/representative');
    return { success: true };
  } catch (err: any) {
    return { error: err?.message || 'Error inesperado.' };
  }
}

export async function deleteAnnouncement(announcementId: string) {
  if (!announcementId) {
    return { error: 'ID inválido.' };
  }

  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'No autorizado.' };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const role = profile?.role;
    if (role !== 'teacher' && role !== 'admin') {
      return { error: 'Acceso denegado.' };
    }

    // Verify ownership or admin
    const { data: existing } = await supabase
      .from('announcements')
      .select('author_id')
      .eq('id', announcementId)
      .single();

    if (existing?.author_id !== user.id && role !== 'admin') {
      return { error: 'No está autorizado para eliminar este anuncio.' };
    }

    const { error } = await supabase.from('announcements').delete().eq('id', announcementId);

    if (error) {
      return { error: `Error al eliminar el anuncio: ${error.message}` };
    }

    revalidatePath('/dashboard/teacher');
    revalidatePath('/dashboard/student');
    revalidatePath('/dashboard/representative');
    return { success: true };
  } catch (err: any) {
    return { error: err?.message || 'Error al eliminar.' };
  }
}

/**
 * Updates a user profile's role and/or representative link.
 * Restriced strictly to administrators.
 */
export async function updateUserProfile(
  profileId: string,
  updates: { role?: string; representative_id?: string | null; grade_level?: string | null }
) {
  if (!profileId) {
    return { error: 'ID de perfil inválido.' };
  }

  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'No autorizado.' };
    }

    // Verify requesting user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return { error: 'Acceso denegado. Se requieren permisos de administrador.' };
    }

    // Update DB
    const { error } = await supabase
      .from('profiles')
      .update({
        ...(updates.role !== undefined && { role: updates.role }),
        ...(updates.representative_id !== undefined && { representative_id: updates.representative_id }),
        ...(updates.grade_level !== undefined && { grade_level: updates.grade_level }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', profileId);

    if (error) {
      return { error: `Error al actualizar perfil: ${error.message}` };
    }

    revalidatePath('/dashboard/admin/users');
    return { success: true };
  } catch (err: any) {
    return { error: err?.message || 'Error en el servidor al actualizar el perfil.' };
  }
}

/**
 * Sends a financial notification/alert to a specific representative.
 * Restricted strictly to administrators.
 */
export async function sendFinancialAlert(representativeId: string, title: string, message: string) {
  if (!representativeId || !title || !message) {
    return { error: 'Todos los campos son obligatorios.' };
  }

  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'No autorizado.' };
    }

    // Verify requesting user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return { error: 'Acceso denegado. Se requieren permisos de administrador.' };
    }

    // Insert alert notification
    const { error } = await supabase.from('notifications').insert({
      user_id: representativeId,
      title,
      message,
      type: 'financial',
      is_read: false,
    });

    if (error) {
      return { error: `Error al enviar alerta: ${error.message}` };
    }

    revalidatePath('/dashboard/representative');
    return { success: true };
  } catch (err: any) {
    return { error: err?.message || 'Error en el servidor al enviar la alerta.' };
  }
}

/**
 * Marks a notification as read.
 * Restricted to the owner of the notification.
 */
export async function markNotificationAsRead(notificationId: string) {
  if (!notificationId) {
    return { error: 'ID de notificación inválido.' };
  }

  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'No autorizado.' };
    }

    // Update status. RLS ensures users can only update their own notifications.
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .eq('user_id', user.id); // Guard client-side query as well

    if (error) {
      return { error: `Error al marcar notificación: ${error.message}` };
    }

    revalidatePath('/dashboard/student');
    revalidatePath('/dashboard/representative');
    return { success: true };
  } catch (err: any) {
    return { error: err?.message || 'Error al actualizar estado.' };
  }
}




