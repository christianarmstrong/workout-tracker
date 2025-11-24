"use client";
import { useRouter } from "next/navigation";
import { Plus, Minus, Pencil } from 'lucide-react';
import { Button } from './ui/button';

type ExerciseCardProps = {
    id: string,
    name: string,
    reps: string,
    sets: string,
    type: string,
    exercisesInWorkout?: Array<any>,
    setExercisesInWorkout?: React.Dispatch<React.SetStateAction<Array<any>>>
}
export default function ExerciseCard({ id, name, reps, sets, type, exercisesInWorkout, setExercisesInWorkout }: ExerciseCardProps) {
    const router = useRouter();

    const handleButtonClick = () => {

if (type === "add") {
        setExercisesInWorkout?.(prev => {
                const current = prev ?? [];
                if (current.some(ex => ex.id === id)) return current;
                return [...current, { id, name, reps, sets }];
            });
            return;
    }

    if (type === "remove") {
        setExercisesInWorkout?.(prev => prev.filter(exercise => exercise.id !== id));
    }

    if (type === "edit") {
        router.push('/workouts/edit');
    }
    };
    return (
        <>
            {// need to add logic here to switch function depending on exercise card type
            }
            <div onClick={() => router.push(`/exercises/log?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}&reps=${encodeURIComponent(reps)}&sets=${encodeURIComponent(sets)}`)} className={type=="none" ? "col-span-9" : "col-span-7"}>
                <div className=" text-sm outline rounded-sm shadow-md p-4 mb-2 w-full min-h-[4rem] flex items-center">
                    <p className="" > {name} <br/> {sets} x {reps} </p>
                </div>
            </div>
            {// need to add logic here to switch function depending on exercise card type
            }
            {type!="none" ? <div onClick={handleButtonClick} className="col-span-2 flex items-stretch">
                <Button className="text-sm outline rounded-sm shadow-md p-4 mb-2 w-full min-h-[4rem] flex items-center"> { type=="remove" ? <Minus/> : type=="add" ? <Plus/> : <Pencil/>} </Button>
            </div> : null}
        </>
    );
}