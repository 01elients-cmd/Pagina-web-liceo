import { createClient } from '@/lib/supabase/server';
import NotificationList from './NotificationList';

export const dynamic = 'force-dynamic';

export default async function NotificationPanel() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Fetch unread notifications for this user
  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_read', false)
    .order('created_at', { ascending: false });

  if (!notifications || notifications.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-3">
      <NotificationList initialNotifications={notifications} />
    </div>
  );
}
