export function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(amount);
}

export function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function getExpensesByCategory(expenses) {
    const categories = {
        food: 0,
        transport: 0,
        entertainment: 0,
        shopping: 0,
        utilities: 0,
        other: 0,
        health: 0,
    };

    expenses.forEach((expense) => {
        const cateogry = expense.cateogry ? expense.category.toLowerCase() : "other";

        if (categories[cateogry] !== undefined) {
            categories[cateogry] += Number(expense.amount);
        } else {
            categories["other"] += Number(expense.amount);
        }
    });

    return categories;
}

export function getTotalExpenses(expenses) {
    return expenses.reduce((total, expense) => total + Number(expense.amount), 0);
}

export function getChartData(expenses) {
    const expensesByCategory = getExpensesByCategory(expenses);

    return Object.entries(expensesByCategory || {})
        .filter(([_, value]) => value > 0)
        .map(([name, value]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            value,
        }));
}

export function getCategoryTextColor(category) {
    const colors = {
        food: "text-indigo-500",
        transport: "text-cayn-500",
        entertainment: "text-purple-500",
        shopping: "text-orange-500",
        utilities: "text-teal-500",
        other: "text-slate-500",
        health: "text-green-500",
    };

    const safeCategory = category ? category.toLowerCase() : "other";
    return colors[safeCategory] || "text-gray-500";
}

export function getMonthName(date) {
    return date.toLocaleDateString("default", { month: "long" });
}

export function getExpensesMonth(expenses, numMonth = 6) {
    const now = new Date();
    const result = {};

    for (let i = 0; i < numMonth; i++) {
        const day = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthYear = `${getMonthName(day)} ${day.getFullYear()}`;
        result[monthYear] = 0;
    }

    expenses.forEach((exp) => {
        const expenseDate = new Date(exp.date);
        const montYear = `${getMonthName(expenseDate)} ${expenseDate.getFullYear()}`;

        if (result[montYear] !== undefined) {
            result[montYear] += Number(exp.amount);
        }
    });

    return result;
}
