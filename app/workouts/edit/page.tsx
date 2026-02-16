"use client";
import ModifyWorkout from "@/components/modify-workout";
import React from "react";

export default function Page() {
    const [exercisesInWorkout, setExercisesInWorkout] = React.useState<Array<any>>([]);

    return (
        <ModifyWorkout
            type="edit"
            availableExercises={exercisesInWorkout}
            exercisesInWorkout={exercisesInWorkout}
            setExercisesInWorkout={setExercisesInWorkout}
        />
    )
}