import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export function Notification() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
          <div className="grid gap-1">
            <p className="text-sm font-medium">Your call has been confirmed.</p>
            <p className="text-sm text-muted-foreground">5 min ago</p>
          </div>
        </div>
        <div
          className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
          <div className="grid gap-1">
            <p className="text-sm font-medium">You have a new message!</p>
            <p className="text-sm text-muted-foreground">1 min ago</p>
          </div>
        </div>
        <div
          className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
          <div className="grid gap-1">
            <p className="text-sm font-medium">Your subscription is expiring soon!</p>
            <p className="text-sm text-muted-foreground">2 hours ago</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
