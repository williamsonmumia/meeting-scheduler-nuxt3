<template>
    <main class="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-8">
        <div class="p-24 md:order-1 hidden md:block">
            <img class="rounded-full transition-transform transform hover:scale-125" src="~/assets/img/hero.png"
                alt="Starship starts the engine" loading="eager" format="avif" width="512" height="512" />
        </div>

        <div>
            <h1 class="font-sans text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight text-green-600">
                Easy scheduling ahead?
            </h1>
            <p class="font-sans text-lg mt-4 text-slate-600 max-w-xl">
                alignova simplifies meeting scheduling by letting you set availability &
                share booking links.
            </p>
            <div class="mt-6 flex flex-col sm:flex-row gap-3">
                <LandingLink href="/api/register" target="_blank" rel="noopener">Get
                    Started</LandingLink>
            </div>
        </div>
    </main>
</template>