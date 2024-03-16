import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

function SpendingPieChart({ transactions }) {
  // Helper function to aggregate transactions data for pie chart
  const aggregateData = () => {
    const transactionsData = [...transactions];

    const aggregatedData = {};

    transactionsData.forEach(transaction => {
      const { category, amount } = transaction;

      // If the category already exists in the result, add the amount to it
      if (aggregatedData[category]) {
        aggregatedData[category] += amount;
      } else {
        // Otherwise, create a new entry for the category
        aggregatedData[category] = amount;
      }
    });

    // Convert the aggregated data object into an array of objects expected by Recharts
    const totalSpent = Object.values(aggregatedData).reduce(
      (total, value) => total + value,
      0
    );

    const pieChartData = Object.keys(aggregatedData).map(category => ({
      name: category,
      value: aggregatedData[category],
      percentage: ((aggregatedData[category] / totalSpent) * 100).toFixed(), // Calculate percentage
    }));

    return pieChartData;
  };

  // Aggregate transactions data
  const pieChartData = aggregateData(transactions);

  // Define colors for each segment
  const COLORS = [
    '#22543D',
    '#276749',
    '#2F855A',
    '#38A169',
    '#48BB78',
    '#68D391',
    '#9AE6B4',
    '#C6F6D5',
  ];

  return (
    <PieChart width={600} height={250}>
      <Pie
        data={pieChartData}
        cx='50%'
        cy='50%'
        innerRadius={60}
        outerRadius={80}
        fill='#8884d8'
        paddingAngle={5}
        dataKey='value'
        label={({ name, percentage }) => `${name}: ${percentage}%`} // Custom label with percentage
      >
        {/* Render each segment */}
        {pieChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={value => [`€${value}`]} />
    </PieChart>
  );
}

export default SpendingPieChart;
