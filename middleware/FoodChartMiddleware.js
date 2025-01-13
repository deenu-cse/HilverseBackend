const generateMealPlan = (diseases, allergies) => {
    // console.log('Diseases:', diseases); 

    const mealPlan = {
        morningMeal: {
            ingredients: [],
            instructions: '',
            calories: 0 
        },
        eveningMeal: {
            ingredients: [],
            instructions: '',
            calories: 0 
        },
        nightMeal: {
            ingredients: [],
            instructions: '',
            calories: 0 
        }
    };

    const getCalories = (ingredient) => {
        const calorieData = {
            'Oats': 150,
            'Almond Milk': 30,
            'Blueberries': 50,
            'Grilled Chicken': 200,
            'Broccoli': 55,
            'Quinoa': 120,
            'Cucumber': 16,
            'Boiled Eggs': 140,
            'Whole Wheat Toast': 80,
            'Avocado': 160,
            'Tomato': 22,
            'Scrambled Eggs': 140,
            'Grilled Turkey': 180,
            'Brown Rice': 215,
            'Steamed Asparagus': 27,
            'Steamed Salmon': 232,
            'Mixed Greens': 10,
            'Cheese': 100,
            'Soy Milk': 40,
            'Soy Sauce': 10,
            'Tofu': 70,
            'Chia Seeds': 58,
            'Berries': 50,
            'Olive oil': 119,
            'Oatmeal': 150, // Add Oatmeal to calorie data
            'Green Salad': 50,
            'Spinach': 40 // Add missing ingredients
        };
        return calorieData[ingredient] || 0;
    };

    if (diseases.includes('Diabetes')) {
        // console.log("disease is diabetes...")
        mealPlan.morningMeal.ingredients.push('Oats', 'Almond Milk', 'Blueberries');
        mealPlan.morningMeal.instructions = 'No sugar, low-carb, use almond milk instead of cow milk';
        mealPlan.morningMeal.calories += getCalories('Oats') + getCalories('Almond Milk') + getCalories('Blueberries');

        mealPlan.eveningMeal.ingredients.push('Grilled Chicken', 'Broccoli', 'Quinoa');
        mealPlan.eveningMeal.instructions = 'No added salt, avoid high-carb foods';
        mealPlan.eveningMeal.calories += getCalories('Grilled Chicken') + getCalories('Broccoli') + getCalories('Quinoa');

        mealPlan.nightMeal.ingredients.push('Cucumber Salad', 'Boiled Eggs', 'Olive oil');
        mealPlan.nightMeal.instructions = 'Low-fat dressing, avoid dairy';
        mealPlan.nightMeal.calories += getCalories('Cucumber') + getCalories('Boiled Eggs') + getCalories('Olive oil');
    }

    if (diseases.includes('Hypertension')) {
        mealPlan.morningMeal.ingredients.push('Whole Wheat Toast', 'Avocado', 'Tomato', 'Scrambled Eggs');
        mealPlan.morningMeal.instructions = 'Use olive oil for cooking, avoid salt';
        mealPlan.morningMeal.calories += getCalories('Whole Wheat Toast') + getCalories('Avocado') + getCalories('Tomato') + getCalories('Scrambled Eggs');

        mealPlan.eveningMeal.ingredients.push('Grilled Turkey', 'Brown Rice', 'Steamed Asparagus');
        mealPlan.eveningMeal.instructions = 'Low-sodium turkey, no added salt to vegetables';
        mealPlan.eveningMeal.calories += getCalories('Grilled Turkey') + getCalories('Brown Rice') + getCalories('Steamed Asparagus');

        mealPlan.nightMeal.ingredients.push('Steamed Salmon', 'Mixed Greens', 'Cucumber');
        mealPlan.nightMeal.instructions = 'No added salt, use olive oil for dressing';
        mealPlan.nightMeal.calories += getCalories('Steamed Salmon') + getCalories('Mixed Greens') + getCalories('Cucumber');
    }

    if (diseases.includes('Cancer')) {
        // console.log("disease is cancer... ")
        mealPlan.morningMeal.ingredients.push('Oatmeal', 'Chia Seeds', 'Berries');
        mealPlan.morningMeal.instructions = 'Rich in antioxidants, no added sugar';
        mealPlan.morningMeal.calories += getCalories('Oatmeal') + getCalories('Chia Seeds') + getCalories('Berries');

        mealPlan.eveningMeal.ingredients.push('Grilled Salmon', 'Quinoa', 'Spinach');
        mealPlan.eveningMeal.instructions = 'Good for heart health, no processed foods';
        mealPlan.eveningMeal.calories += getCalories('Grilled Salmon') + getCalories('Quinoa') + getCalories('Spinach');

        mealPlan.nightMeal.ingredients.push('Green Salad', 'Grilled Chicken', 'Olive Oil Dressing');
        mealPlan.nightMeal.instructions = 'High in protein, no added sugars';
        mealPlan.nightMeal.calories += getCalories('Green Salad') + getCalories('Grilled Chicken') + getCalories('Olive Oil Dressing');
    }

    // Allergy-based restrictions
    if (allergies.includes('Milk Allergy')) {
        mealPlan.morningMeal.ingredients = mealPlan.morningMeal.ingredients.filter(ingredient => ingredient !== 'Cow Milk');
        mealPlan.eveningMeal.ingredients = mealPlan.eveningMeal.ingredients.filter(ingredient => ingredient !== 'Butter');
        mealPlan.nightMeal.ingredients = mealPlan.nightMeal.ingredients.filter(ingredient => ingredient !== 'Cheese');
    }

    // Other allergy filters (if necessary)
    // console.log('Meal Plan after allergy filtering:', mealPlan);

    return mealPlan;
};

module.exports = generateMealPlan;
