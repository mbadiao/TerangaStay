import { Button } from "@/components/ui/button";

export default function Reservation() {
  return (
    <div className="container mx-auto py-8 h-screen">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <CalendarIcon className="mr-2 h-6 w-6" />
        Hotel Reservations
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left flex items-center">
                <PackageIcon className="mr-2 h-4 w-4" />
                Type
              </th>
              <th className="px-4 py-2 text-left ">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Arrival
              </th>
              <th className="px-4 py-2 text-left">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Departure
              </th>
              <th className="px-4 py-2 text-left">
                <DollarSignIcon className="mr-2 h-4 w-4" />
                Total Price
              </th>
              <th className="px-4 py-2 text-left">
                <CircleCheckIcon className="mr-2 h-4 w-4" />
                Status
              </th>
              <th className="px-4 py-2 text-left">
                <FilePenIcon className="mr-2 h-4 w-4" />
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">
                <PackageIcon className="mr-2 h-4 w-4" />
                Hotel
              </td>
              <td className="px-4 py-2">
                <CalendarIcon className="mr-2 h-4 w-4" />
                2023-06-01
              </td>
              <td className="px-4 py-2">
                <CalendarIcon className="mr-2 h-4 w-4" />
                2023-06-05
              </td>
              <td className="px-4 py-2">
                <DollarSignIcon className="mr-2 h-4 w-4" />
                $500
              </td>
              <td className="px-4 py-2">
                <span className="bg-green-200 flex items-center justify-center text-green-800 px-2 py-1 rounded-full">
                  <CircleCheckIcon className="mr-2 h-4 w-4" />
                  Confirmed
                </span>
              </td>
              <td className="px-4 py-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FilePenIcon className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" color="red">
                    <TrashIcon className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">
                <PackageIcon className="mr-2 h-4 w-4" />
                Room
              </td>
              <td className="px-4 py-2">
                <CalendarIcon className="mr-2 h-4 w-4" />
                2023-07-15
              </td>
              <td className="px-4 py-2">
                <CalendarIcon className="mr-2 h-4 w-4" />
                2023-07-20
              </td>
              <td className="px-4 py-2">
                <DollarSignIcon className="mr-2 h-4 w-4" />
                $300
              </td>
              <td className="px-4 py-2">
                <span className="bg-yellow-200 flex items-center justify-center text-yellow-800 px-2 py-1 rounded-full">
                  <CircleAlertIcon className="mr-2 h-4 w-4" />
                  Pending
                </span>
              </td>
              <td className="px-4 py-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FilePenIcon className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" color="red">
                    <TrashIcon className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">
                <PackageIcon className="mr-2 h-4 w-4" />
                Hotel
              </td>
              <td className="px-4 py-2">
                <CalendarIcon className="mr-2 h-4 w-4" />
                2023-08-10
              </td>
              <td className="px-4 py-2">
                <CalendarIcon className="mr-2 h-4 w-4" />
                2023-08-15
              </td>
              <td className="px-4 py-2">
                <DollarSignIcon className="mr-2 h-4 w-4" />
                $600
              </td>
              <td className="px-4 py-2">
                <span className="bg-red-200 flex items-center justify-center text-red-800 px-2 py-1 rounded-full">
                  <CircleXIcon className="mr-2 h-4 w-4" />
                  Cancelled
                </span>
              </td>
              <td className="px-4 py-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FilePenIcon className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" color="red">
                    <TrashIcon className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CircleAlertIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CircleXIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function PackageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
