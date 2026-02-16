"use client";

import React from "react";
import ModifyWorkout from "@/components/modify-workout"; // your existing component (make it a pure presentational component)

export default function CreateWorkoutClient({ initialExercises }: { initialExercises: any[] }) {
  const [exercisesInWorkout, setExercisesInWorkout] = React.useState<any[]>([]);

  // initialize from server props on mount (keeps SSR->CSR transition smooth)
  React.useEffect(() => {
    setExercisesInWorkout([]);
  }, []);

  return (
    <ModifyWorkout
      type="create"
      availableExercises={initialExercises}
      exercisesInWorkout={exercisesInWorkout}
      setExercisesInWorkout={setExercisesInWorkout}
    />
  );
}