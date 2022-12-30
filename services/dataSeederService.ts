import agent from "./agent";

export async function CreateCategoriesAsync() {
    try {
        for (const category of categories) {
            const types = categoriesAndTypes[category as keyof typeof categoriesAndTypes].map(item => (
                {
                    ServiceType: {
                        name: item.name
                    }
                }
            ))

            const categoryData = {
                name: category,
                types: {
                    create: types
                }
            }

            console.log(categoryData);

            const result = await agent.Categories.create(categoryData)

            console.log(result);

        }
    } catch (error) {

    }
}


const categories = [
    'Home services',
    'Personal care',
    'Pet care',
    'Transportation',
    'Food and grocery',
    'Home security and automation',
    'Personal finance and legal',
    'Personal coaching and consulting',
    'Event services',
    'Business services',
]


const categoriesAndTypes = {
    'Home services': [
        { category: 'Home services', name: 'Home repair and maintenance' },
        { category: 'Home services', name: 'Cleaning' },
        { category: 'Home services', name: 'Lawn care and landscaping' },
    ],
    'Personal care': [
        { category: 'Personal care', name: 'Hair styling' },
        { category: 'Personal care', name: 'Makeup application' },
        { category: 'Personal care', name: 'Massage therapy' },
    ],
    'Pet care': [
        { category: 'Pet care', name: 'Dog walking' },
        { category: 'Pet care', name: 'Pet sitting' },
        { category: 'Pet care', name: 'Grooming' },
    ],
    'Transportation': [
        { category: 'Transportation', name: 'Taxi services' },
        { category: 'Transportation', name: 'Ride-sharing' },
        { category: 'Transportation', name: 'Car rental' },
    ],
    'Food and grocery': [
        { category: 'Food and grocery', name: 'Meal delivery' },
        { category: 'Food and grocery', name: 'Grocery delivery' },
    ],
    'Home security and automation': [
        { category: 'Home security and automation', name: 'Alarm systems' },
        { category: 'Home security and automation', name: 'Smart home device installation and maintenance' },
    ],
    'Personal finance and legal': [
        { category: 'Personal finance and legal', name: 'Tax preparation' },
        { category: 'Personal finance and legal', name: 'Legal advice' },
    ],
    'Personal coaching and consulting': [
        { category: 'Personal coaching and consulting', name: 'Career coaching' },
        { category: 'Personal coaching and consulting', name: 'Life coaching' },
        { category: 'Personal coaching and consulting', name: 'Business consulting' },
    ],
    'Event services': [
        { category: 'Event services', name: 'Event planning' },
        { category: 'Event services', name: 'Catering' },
        { category: 'Event services', name: 'Entertainment' },
    ],
    'Business services': [
        { category: 'Business services', name: 'Marketing' },
        { category: 'Business services', name: 'Web design' },
        { category: 'Business services', name: 'Accounting' },
    ],
}
