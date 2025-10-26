import { useRouter } from "next/navigation";
import { Plus, Minus, Pencil } from 'lucide-react';
import { Button } from './ui/button';
export default function ExerciseCard({ name, reps, sets, type }: { name: string, reps: string, sets: string, type: string }) {
    const router = useRouter();
    return (
        <>
            {// need to add logic here to switch function depending on exercise card type
            }
            <div onClick={() => router.push(`/exercises/log?name=${encodeURIComponent(name)}&reps=${encodeURIComponent(reps)}&sets=${encodeURIComponent(sets)}`)} className={type=="none" ? "col-span-9" : "col-span-7"}>
                <div className=" text-sm outline rounded-sm shadow-md p-4 mb-2 w-full min-h-[4rem] flex items-center">
                    <p className="" > {name} <br/> {sets} x {reps} </p>
                </div>
            </div>
            {// need to add logic here to switch function depending on exercise card type
            }
            {type!="none" ? <div onClick={() => router.push('/workouts/edit')} className="col-span-2 flex items-stretch">
                <Button className="text-sm outline rounded-sm shadow-md p-4 mb-2 w-full min-h-[4rem] flex items-center"> { type=="remove" ? <Minus/> : type=="add" ? <Plus/> : <Pencil/>} </Button>
            </div> : null}
        </>
    );
}