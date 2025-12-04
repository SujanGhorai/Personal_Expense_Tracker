export function formatCurrency(amount) {
    const num = Number(amount) || 0;
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(num);
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return ""; // guard for invalid date

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
        // fix typo and defensively read category
        const category =
            expense && expense.category ? String(expense.category).toLowerCase() : "other";
        const amount = Number(expense.amount) || 0;

        if (categories[category] !== undefined) {
            categories[category] += amount;
        } else {
            categories["other"] += amount;
        }
    });

    return categories;
}

export function getTotalExpenses(expenses) {
    return expenses.reduce((total, expense) => total + (Number(expense.amount) || 0), 0);
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
        transport: "text-cyan-500", // fixed typo 'cayn' -> 'cyan'
        entertainment: "text-purple-500",
        shopping: "text-orange-500",
        utilities: "text-teal-500",
        other: "text-slate-500",
        health: "text-green-500",
    };

    const safeCategory = category ? String(category).toLowerCase() : "other";
    return colors[safeCategory] || "text-gray-500";
}

export function getMonthName(date) {
    // accept Date or parsable string
    const d = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("default", { month: "long" });
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
        if (Number.isNaN(expenseDate.getTime())) return;

        const monthYear = `${getMonthName(expenseDate)} ${expenseDate.getFullYear()}`;

        if (result[monthYear] !== undefined) {
            result[monthYear] += Number(exp.amount) || 0;
        }
    });

    return result;
}
