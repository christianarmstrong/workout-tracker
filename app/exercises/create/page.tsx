
import CreateExerciseForm from "@/components/create-exercise-form";


export default async function Home() {

    return (
        <div className="flex min-h-screen items-center justify-center font-sans bg-zinc-50">
            <main className="flex min-h-screen w-full max-w-3xl flex-col justify-between py-20 px-10 bg-zinc-50 items-start">
                <div className="grid grid-cols-8 gap-1 items-start text-start">
                    <h1 className="max-w-md col-span-6 text-3xl font-semibold leading-10 tracking-tight text-black">
                        Create Exercise
                    </h1>
                    <p className="max-w-md col-span-full text-sm font-normal text-black mb-7" > Add a name, reps, and sets </p>
                    <CreateExerciseForm />
                </div>
            </main>
        </div>
    )
}