<template>
    <main class="grid lg:grid-cols-2 items-center gap-10 pt-8 pb-8 md:pt-8">
        <div>
            <h1 class="font-sans text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight text-green-600">
                Scheduling meetings shouldn't be hard.
            </h1>
            <p class="font-sans text-lg mt-4 text-slate-600 max-w-xl">
                Alignova simplifies meeting scheduling by letting you set your availability
                and share a single booking link.
            </p>
            <div class="mt-6 flex flex-col sm:flex-row gap-3">
                <LandingLink href="/api/register" target="_blank" rel="noopener">Get
                    Started</LandingLink>
            </div>
        </div>

        <div class="md:order-1 hidden md:block">
            <img class="w-full max-w-lg mx-auto" src="~/assets/img/hero.png"
                alt="Illustration of people scheduling meetings and reviewing availability" loading="eager" format="avif" width="512" height="512" />
        </div>
    </main>
</template>