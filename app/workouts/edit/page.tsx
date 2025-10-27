"use client";
import ExerciseCard from "@/components/exercise-card";
import ModifyWorkout from "@/components/modify-workout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    return (
        <ModifyWorkout type="edit"/>
    )
}