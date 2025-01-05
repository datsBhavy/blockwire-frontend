import { Andromeda, Headshot1, Headshot2, Headshot3, Headshot4, Headshot5, Headshot6, Headshot7, Headshot8, LunarEclipseLandscape, RedBlueGalaxy, RocketFlightPathLandscape, RocketTakeoffLandscape, SunsetRocketLanding, WideMoonLandscape } from "./images";
import { getRandomHeadshot } from "./utils";

export const dummySlide = {
    title: 'Test Blog 4',
    description: 'This is a test blog, this tests to see if you can upload tags for blogs etc',
    tags: ['Crypto', 'Max Mackenzie'],
    image: LunarEclipseLandscape,
    author: {
        name: 'Erik Lew',
        image: getRandomHeadshot()
    }
}

export const dummySlide1 = {
    title: "10 Tips to Improve Your Morning Routine",
    description: "Start your day off right with these ten practical tips to boost productivity and energy.",
    tags: ["Lifestyle", "Productivity"],
    image: RedBlueGalaxy,
    author: {
        name: "Emily Sanders",
        image: Headshot2,
    },
}

export const dummySlide2 = {
    title: "The Ultimate Guide to Crypto Trading in 2024",
    description: "A comprehensive guide for beginners and advanced traders to navigate the volatile crypto market.",
    tags: ["Crypto", "Finance"],
    image: RocketTakeoffLandscape,
    author: {
        name: "Michael Thomson",
        image: Headshot3,
    },
}

export const dummySlide3 = {
    title: "5 Easy Recipes for a Healthy Dinner",
    description: "Quick, delicious, and healthy dinner ideas you can prepare in under 30 minutes.",
    tags: ["Food", "Recipes"],
    image: WideMoonLandscape,
    author: {
        name: "Sophia Martinez",
        image: Headshot4,
    },
}

export const dummySlide4 = {
    title: "Exploring the Wonders of Iceland: A Travel Guide",
    description: "Discover the beauty of Iceland with our ultimate travel guide to glaciers, geysers, and more.",
    tags: ["Travel", "Iceland"],
    image: LunarEclipseLandscape,
    author: {
        name: "Jack Reynolds",
        image: Headshot5,
    },
}

export const dummySlide5 = {
    title: "Top 5 AI Tools You Should Know About in 2024",
    description: "AI is reshaping industries. Here are the top tools leading the revolution.",
    tags: ["Technology", "AI"],
    image: Andromeda,
    author: {
        name: "Alexandra Wolfe",
        image: Headshot6,
    },
}
export const dummySlide6 = {
    title: "How to Save for Your First Home in 2024",
    description: "A detailed guide to budgeting and saving to make your dream home a reality.",
    tags: ["Finance", "Real Estate"],
    image: SunsetRocketLanding,
    author: {
        name: "Nathan Scott",
        image: Headshot7,
    },
}

export const dummySlide7 = {
    title: "The Rise of E-Sports: What You Need to Know",
    description: "E-sports is more popular than ever. Explore its meteoric rise and what the future holds.",
    tags: ["Gaming", "E-Sports"],
    image: RocketFlightPathLandscape,
    author: {
        name: "Chloe Andrews",
        image: Headshot8,
    },
}
export const dummySlide8 = {
    title: "7 Ways to Boost Your Mental Health Naturally",
    description: "Practical strategies to improve mental health through mindfulness, exercise, and more.",
    tags: ["Health", "Wellness"],
    image: RedBlueGalaxy,
    author: {
        name: "David Harper",
        image: Headshot1,
    },
}

export const dummySlides = [
    dummySlide1,
    dummySlide2
    , dummySlide3
    , dummySlide4
    , dummySlide5,
    dummySlide6
    , dummySlide7, dummySlide8
];

export const dummyBlogCategory = {
    name: 'Recent News',
    articles: dummySlides
}
export const dummyEditorCategory = {
    name: 'Editors Pick',
    articles: dummySlides
}