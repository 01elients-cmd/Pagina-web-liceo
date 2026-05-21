'use client';

import { useState, useTransition } from 'react';
import { createClient } from '@/lib/supabase/client';
import { saveLibraryResource, deleteLibraryResource } from '@/app/dashboard/actions';

interface LibraryResourceManagerProps {
  subjects: any[];
  initialResources: any[];
}

export default function LibraryResourceManager({
  subjects,
  initialResources,
}: LibraryResourceManagerProps) {
  const [resources, setResources] = useState(initialResources);
  const [selectedSubjectId, setSelectedSubjectId] = useState(
    subjects.length > 0 ? subjects[0].id : ''
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'saving' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  if (subjects.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center text-slate-500">
        <h3 className="font-bold text-slate-900">Sin Materias Asignadas</h3>
        <p className="text-xs text-slate-500 mt-1">
          Debe tener al menos una materia asignada para subir material académico.
        </p>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const validExtensions = ['.pdf', '.docx', '.doc'];
      const fileExt = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
      
      if (!validExtensions.includes(fileExt)) {
        setErrorMessage('Solo se permiten documentos PDF o Word (.docx, .doc).');
        setFile(null);
        return;
      }

      if (selectedFile.size > 15 * 1024 * 1024) {
        setErrorMessage('El tamaño máximo del archivo es de 15 MB.');
        setFile(null);
        return;
      }

      setErrorMessage('');
      setFile(selectedFile);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!title || !selectedSubjectId || !file) {
      setErrorMessage('Por favor rellene todos los campos y seleccione un archivo.');
      return;
    }

    try {
      setUploadStatus('uploading');

      // 1. Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const uniqueFileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${uniqueFileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('virtual_library')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Error en Storage: ${uploadError.message}`);
      }

      setUploadStatus('saving');

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('virtual_library')
        .getPublicUrl(filePath);

      // 3. Save metadata to Postgres via Server Action
      const result = await saveLibraryResource({
        title,
        description,
        fileUrl: publicUrl,
        subjectId: selectedSubjectId,
      });

      if (result.error) {
        // Cleanup storage on metadata insertion failure
        await supabase.storage.from('virtual_library').remove([filePath]);
        throw new Error(result.error);
      }

      setUploadStatus('success');
      setTitle('');
      setDescription('');
      setFile(null);
      
      // Reset input element
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      // Optimistically prepend to resources list
      const selectedSubject = subjects.find(s => s.id === selectedSubjectId);
      setResources([
        {
          id: Math.random().toString(),
          title,
          description,
          file_url: publicUrl,
          subjects: selectedSubject,
          created_at: new Date().toISOString(),
        },
        ...resources,
      ]);

      setTimeout(() => setUploadStatus('idle'), 3000);
    } catch (err: any) {
      setUploadStatus('error');
      setErrorMessage(err.message || 'Error al subir el archivo.');
    }
  };

  const handleDelete = (resourceId: string, fileUrl: string) => {
    if (!confirm('¿Está seguro de que desea eliminar este recurso académico?')) return;

    startTransition(async () => {
      const result = await deleteLibraryResource(resourceId, fileUrl);
      if (result.error) {
        alert(result.error);
      } else {
        setResources(resources.filter(r => r.id !== resourceId));
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Upload Form */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 h-fit">
        <h3 className="text-md font-bold text-slate-900 tracking-tight">Subir Material de Estudio</h3>
        
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold p-2.5 rounded">
              {errorMessage}
            </div>
          )}

          {uploadStatus === 'success' && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold p-2.5 rounded">
              ¡Material subido exitosamente!
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Asignatura / Curso
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="block w-full px-3 py-1.5 border border-slate-300 bg-white text-slate-900 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-800"
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} ({sub.grade_level})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Título del Material
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Guía Práctica de Álgebra"
              className="appearance-none block w-full px-3 py-2 border border-slate-300 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Descripción Breve
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej. Ejercicios resueltos y propuestos para el lapso."
              rows={3}
              className="appearance-none block w-full px-3 py-2 border border-slate-300 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 text-xs resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Archivo (PDF, Word)
            </label>
            <input
              id="file-input"
              type="file"
              required
              accept=".pdf,.docx,.doc"
              onChange={handleFileChange}
              className="block w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={uploadStatus === 'uploading' || uploadStatus === 'saving' || isPending}
            className="w-full py-2 bg-slate-900 text-white rounded-md text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            {uploadStatus === 'uploading' && 'Subiendo archivo...'}
            {uploadStatus === 'saving' && 'Guardando metadatos...'}
            {uploadStatus !== 'uploading' && uploadStatus !== 'saving' && 'Subir Archivo'}
          </button>
        </form>
      </div>

      {/* Materials List */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-md font-bold text-slate-900 tracking-tight">Material Académico Compartido</h3>

        <div className="space-y-3">
          {resources.length === 0 ? (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500 text-xs">
              Usted no ha subido ningún material a la biblioteca virtual todavía.
            </div>
          ) : (
            resources.map((res: any) => (
              <div
                key={res.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-xs transition-shadow"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded uppercase">
                      {res.subjects?.name || 'Materia'}
                    </span>
                    <span className="text-[9px] font-semibold text-slate-400">
                      {res.subjects?.grade_level || 'Nivel'}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-950 text-sm">{res.title}</h4>
                  <p className="text-xs text-slate-500 max-w-lg leading-relaxed">
                    {res.description || 'Sin descripción adicional.'}
                  </p>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                  <span className="text-[10px] text-slate-400">
                    {new Date(res.created_at).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                  <div className="flex gap-2">
                    <a
                      href={res.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-900 hover:text-black bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition-colors"
                    >
                      Ver / Descargar
                    </a>
                    <button
                      onClick={() => handleDelete(res.id, res.file_url)}
                      disabled={isPending}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
