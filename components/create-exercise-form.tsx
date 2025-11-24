"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { createClient } from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation";

const exercise = z.object({
  name: z.string().min(1, "Exercise name is required"),
  reps: z.string().min(1, "Reps is required"),
  sets: z.string().min(1, "Sets is required")
})

export default function CreateExerciseForm() {

  React.useEffect(() => {
    const missing: string[] = []
    if (typeof Card === "undefined") missing.push("Card")
    if (typeof CardHeader === "undefined") missing.push("CardHeader")
    if (typeof CardContent === "undefined") missing.push("CardContent")
    if (typeof CardFooter === "undefined") missing.push("CardFooter")
    if (typeof CardTitle === "undefined") missing.push("CardTitle")
    if (typeof Field === "undefined") missing.push("Field")
    if (typeof FieldLabel === "undefined") missing.push("FieldLabel")
    if (typeof FieldGroup === "undefined") missing.push("FieldGroup")
    if (typeof FieldDescription === "undefined") missing.push("FieldDescription")
    if (typeof FieldError === "undefined") missing.push("FieldError")
    if (typeof Input === "undefined") missing.push("Input")
    if (typeof Button === "undefined") missing.push("Button")
    if (missing.length) {
      console.error("Missing UI exports in exercise-create-form:", missing)
    }
  }, [])

  const form = useForm<z.infer<typeof exercise>>({
    resolver: zodResolver(exercise),
    defaultValues: {
      name: "",
      reps: "",
      sets: ""
    },
  })


  const router = useRouter();
  async function onSubmit(data: z.infer<typeof exercise>) {
    try {
      const supabase = createClient();
      const { data: inserted, error } = await supabase
        .from("exercises")
        .insert([{ name: data.name, reps: data.reps, sets: data.sets, created_by: "9bf614f0-a576-4f0d-94f4-fb9dd72fe8aa" }])
        .select()
        .single();

      if (error) {
        console.error("Insert error:", error);
        toast("Failed to save exercise");
        return;
      }

      toast("Exercise saved");
      form.reset();
      router.replace('/workouts');
      console.log("Inserted exercise:", inserted);
    } catch (err) {
      console.error(err);
      toast("Unexpected error");
    }
  }

  return (
    <>
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} className="col-span-8">
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="exercise-name">Exercise Name</FieldLabel>
                <Input
                  {...field}
                  id="exercise-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g. Flat Dumbbell Bench Press"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="reps"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="exercise-reps">Reps</FieldLabel>
                <Input
                  {...field}
                  id="exercise-reps"
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g. 8-12"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="sets"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="exercise-sets">Sets</FieldLabel>
                <Input
                  {...field}
                  id="exercise-sets"
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g. 3"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <Field orientation="horizontal" className="mt-6">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" form="form-rhf-demo">
          Save Exercise
        </Button>
      </Field>
    </>
  )
}

