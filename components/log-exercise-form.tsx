"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { createClient } from "@/lib/utils/supabase/client";
import { Card } from "./ui/card";

const setItem = z.object({
  reps: z.string().min(1, "Reps required"),
  weight: z.string().min(1, "Weight required"),
});
const exerciseSchema = z.object({
  sets: z.array(setItem).min(1),
});

type FormValues = z.infer<typeof exerciseSchema>;

export default function LogExerciseForm({ id, sets }: { id: string; sets: number }) {
  const router = useRouter();
  const supabase = createClient();
  // state for previous sets (one entry per set index)
  const [previousSets, setPreviousSets] = React.useState<{ reps: string | number; weight: string | number }[]>(
    () => Array.from({ length: sets }).map(() => ({ reps: "", weight: "" }))
  );

  async function fetchPreviousSets() {
    try {
    const { data, error } = await supabase
      .from("workout_sets")
      .select("*")
      .eq("exercise_id", id)
      .order("performed_at", { ascending: false })
      .limit(100);
    
    if (data) {
      // process data to get the most recent set for each set number
      const latestSets: { [key: number]: { reps: string | number; weight: string | number } } = {};
      data.forEach((set) => {
        const setNum = set.set_number;
        if (!latestSets[setNum]) {
          latestSets[setNum] = { reps: set.reps, weight: set.weight };
        }
      });
      setPreviousSets(Array.from({ length: sets }).map((_, i) => latestSets[i + 1] || { reps: "", weight: "" }));
    }
    if (error) {
      console.error("fetch previous sets error:", error);
      return;
    }
  } catch (err) {
    console.error("fetch previous sets unexpected error:", err);
  }
  }


  const { control, handleSubmit, reset, formState: { errors, isSubmitting },} = useForm<FormValues>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: { sets: Array.from({ length: sets }).map(() => ({ reps: "", weight: "" })), },
  });

  async function onSubmit(values: FormValues) {
    console.log("Submitted sets:", values.sets);
    // build payloads with setNumber = index + 1
    const payloads = values.sets.map((s, i) => ({
      user_id: "9bf614f0-a576-4f0d-94f4-fb9dd72fe8aa",
      exercise_id: id,
      set_number: i + 1,
      reps: s.reps,
      weight: s.weight,
      // include other fields (exercise_id, session_id, etc.) as needed
    }));

    try {
      console.log("Inserting payloads:", payloads);
      const { data, error } = await supabase.from("workout_sets").insert(payloads);
      if (error) {
        console.error("Insert error:", error);
        toast("Failed to log sets");
        return;
      }
      toast("Sets logged");
      reset();
      router.push("/workouts");
    } catch (e) {
      console.error(e);
      toast("Unexpected error");
    }
  }

  // Fetch previous sets
  React.useEffect(() => {
    fetchPreviousSets();
    console.log("Fetching previous sets for exercise id:", id);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {Array.from({ length: sets }).map((_, idx) => (
        <React.Fragment key={idx}>
          <h1 className="text-lg font-semibold leading-10 tracking-tight text-black mt-4">
            Set {idx + 1}
          </h1>

          <Card> <div className="ml-3"> Previous set -  {previousSets[idx]?.reps} x {previousSets[idx]?.weight}</div></Card>
          
          <FieldGroup>
            <Controller
              name={`sets.${idx}.reps`}
              control={control as any}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={`log-reps-${idx}`} className="sr-only">Reps</FieldLabel>
                  <Input
                    {...field}
                    id={`log-reps-${idx}`}
                    placeholder="enter reps"
                    aria-invalid={false}
                  />
                </Field>
              )}
            />

            <Controller
              name={`sets.${idx}.weight`}
              control={control as any}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={`log-weight-${idx}`} className="sr-only">Weight</FieldLabel>
                  <Input
                    {...field}
                    id={`log-weight-${idx}`}
                    placeholder="enter weight"
                    aria-invalid={false}
                  />
                </Field>
              )}
            />
          </FieldGroup>
        </React.Fragment>
      ))}

      <div className="mt-4 flex gap-2">
        <Button type="submit">Log</Button>
      </div>
    </form>
  );
}