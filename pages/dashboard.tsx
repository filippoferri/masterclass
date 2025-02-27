  "use client";

  import { useSession } from "next-auth/react";
  import { useRouter } from "next/navigation";
  import Link from "next/link";
  import React from "react";
  import useSWR, { mutate } from "swr";

  export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const fetcher = (url: string) =>
      fetch(url, { credentials: "include" }).then((res) => res.json());
    const { data: masterclasses, error } = useSWR("/api/masterclasses", fetcher);

    if (status === "loading") return <p>Loading session...</p>;
    if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
      router.push("/admin");
      return null;
    }

    if (error) return <p>Failed to load masterclasses</p>;
    if (!masterclasses) return <p>Loading masterclasses...</p>;

    async function handleDelete(id: string) {
      if (!window.confirm("Are you sure you want to delete?")) return;

      try {
        const res = await fetch(`/api/masterclasses/${id}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to delete");

        mutate("/api/masterclasses");
        router.refresh();
      } catch (err: any) {
        alert(err.message);
      }
    }

    return (
      <div className="min-h-screen flex justify-center bg-gray-100 px-4">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Masterclass Dashboard
          </h1>

          <div className="flex justify-end mb-6">
            <Link href="/dashboard/create">
              <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-600">
                + Create Masterclass
              </button>
            </Link>
          </div>

          {masterclasses.length > 0 ? (
            <ul className="space-y-4">
              {masterclasses.map((mc: any) => (
                <li
                  key={mc.id}
                  className="p-4 bg-gray-100 rounded-md flex justify-between items-center"
                  >
                  <div className="w-1/3 flex flex-col">
                    <h2 className="text-lg font-bold">{mc.title}</h2>
                    <p className="text-sm text-gray-600">Duration: {mc.duration} min</p>
                  </div>

                  <div className="w-1/3 flex items-center justify-center  space-x-4">
                      {/* Join Page Link */}
                      <Link href={`/join?id=${mc.id}`} target="_blank">
                        <button
                          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                          aria-label="Open Join Page"
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24"
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="w-6 h-6"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                        </button>
                      </Link>

                      {/* Thank You Page Link */}
                      <Link href={`/thankyou?id=${mc.id}`} target="_blank">
                        <button
                          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                          aria-label="Open Join Page"
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24"
                            fill="#ffffff" 
                            className="w-6 h-6"
                            viewBox="0 0 256 256">
                            <path d="M152,224a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,224ZM128,112a12,12,0,1,0-12-12A12,12,0,0,0,128,112Zm95.62,43.83-12.36,55.63a16,16,0,0,1-25.51,9.11L158.51,200h-61L70.25,220.57a16,16,0,0,1-25.51-9.11L32.38,155.83a16.09,16.09,0,0,1,3.32-13.71l28.56-34.26a123.07,123.07,0,0,1,8.57-36.67c12.9-32.34,36-52.63,45.37-59.85a16,16,0,0,1,19.6,0c9.34,7.22,32.47,27.51,45.37,59.85a123.07,123.07,0,0,1,8.57,36.67l28.56,34.26A16.09,16.09,0,0,1,223.62,155.83ZM99.43,184h57.14c21.12-37.54,25.07-73.48,11.74-106.88C156.55,47.64,134.49,29,128,24c-6.51,5-28.57,23.64-40.33,53.12C74.36,110.52,78.31,146.46,99.43,184Zm-15,5.85Q68.28,160.5,64.83,132.16L48,152.36,60.36,208l.18-.13ZM208,152.36l-16.83-20.2q-3.42,28.28-19.56,57.69l23.85,18,.18.13Z"></path>
                          </svg>
                        </button>
                      </Link>
                      {/* Countdown Page Link */}
                      <Link href={`/countdown?id=${mc.id}`} target="_blank">
                        <button
                          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                          aria-label="Open Join Page"
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24"
                            fill="#ffffff" 
                            viewBox="0 0 256 256">
                            <path d="M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z"></path>
                          </svg>
                        </button>
                      </Link>
                      
                  </div>

                  <div className="w-1/3 flex items-center justify-end space-x-4">
                    <button
                      onClick={() => router.push(`/dashboard/edit/${mc.id}`)}
                      className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600"
                      title="Edit"
                    >
                      <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="w-6 h-6"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(mc.id)}
                      className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600"
                      title="Delete"
                    >
                      <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="w-6 h-6"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No masterclasses available.</p>
          )}
        </div>
      </div>
    );
  }