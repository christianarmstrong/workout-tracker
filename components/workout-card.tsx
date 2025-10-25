import { useRouter } from "next/navigation";
import { Pencil } from 'lucide-react';
import { Button } from './ui/button';
export default function WorkoutCard(workoutName: string) {
    const router = useRouter();
    return (
        <>
            <div onClick={() => router.push('/workouts/record')} className="col-span-6">
                <div className="outline-solid outline rounded-sm shadow-md p-5 w-full">
                    <h1 > {workoutName} </h1>
                </div>
            </div>
            <div onClick={() => router.push('/workouts/edit')} className="col-span-2 flex items-stretch">
                <Button className="w-full h-full shadow-md p-6 flex items-center justify-center"> <Pencil/> </Button>
            </div>
        </>
    );
}