"use client";
import { useRouter } from "next/navigation";
import { Plus, Minus, Pencil, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { createClient } from "@/lib/utils/supabase/client";

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
    const supabase = createClient();

    const onCardClick = () => {
        if (type === "add" || type === "remove") return null;
        router.push(`/exercises/log?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}&reps=${encodeURIComponent(reps)}&sets=${encodeURIComponent(sets)}`);
    }

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

        if (type === "delete") {
            console.log("Deleting exercise with id:", id);
            supabase.from("exercises").delete().eq("id", id).then(({ error }) => {
                if (error) {
                    console.error("Error deleting exercise:", error);
                    return;
                }
                router.refresh();
            });
            console.log("Delete button clicked for exercise with id:", id);
        };
    }
    return (
        <>
            {// need to add logic here to switch function depending on exercise card type
            }
            <div className="col-span-9 grid grid-cols-9 items-stretch mb-2 min-h-[4rem] gap-x-2">
                <div onClick={onCardClick} className={type=="none" ? "col-span-9 h-full" : "col-span-7 h-full"}>
                    <div className=" text-sm outline rounded-sm shadow-md p-4 w-full h-full flex items-center">
                        <p className="" > {name} <br/> {sets} x {reps} </p>
                    </div>
                </div>
                {type!="none" ? <div onClick={handleButtonClick} className="col-span-2 h-full flex items-stretch">
                    <Button className="text-sm outline rounded-sm shadow-md p-4 w-full h-full flex items-center"> { type=="remove" ? <Minus/> : type=="add" ? <Plus/> : <Trash2/>} </Button>
                </div> : null}
            </div>
        </>
    );
}