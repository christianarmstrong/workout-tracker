"use client";
import { useRouter } from "next/navigation";
import { Pencil } from 'lucide-react';
import { Button } from './ui/button';
export default function WorkoutCard({ id, name }: { id: string; name: string }) {
    const router = useRouter();
    return (
        <>
            <div onClick={() => router.push(`/workouts/log?id=${encodeURIComponent(id)}`)} className="col-span-7">
                <div className="outline-solid outline rounded-sm shadow-md p-5 w-full">
                    <p > {name} </p>
                </div>
            </div>
            <div onClick={() => router.push('/workouts/edit')} className="col-span-2 flex items-stretch">
                <Button className="w-full h-full shadow-md p-6 flex items-center justify-center"> <Pencil/> </Button>
            </div>
        </>
    );
}