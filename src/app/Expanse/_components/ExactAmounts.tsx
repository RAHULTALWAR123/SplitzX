import { useState, useEffect } from "react";

function ExactAmounts({ individuals, amount }: { individuals: {id: string, name: string}[], amount: number }) {
  const validIndividuals = individuals?.filter(person => person.name && person.name.trim() !== '') || [];
  const equalAmount = amount / (validIndividuals.length || 1);

  // Initialize amounts state with proper defaults
  const [amounts, setAmounts] = useState<Record<string, number>>(() => {
    return validIndividuals.reduce((acc, person) => ({
      ...acc,
      [person.id]: equalAmount
    }), {});
  });

  // Update amounts when individuals or total amount changes
  useEffect(() => {
    const newAmounts = validIndividuals.reduce((acc, person) => ({
      ...acc,
      [person.id]: equalAmount
    }), {});
    setAmounts(newAmounts);
  }, [individuals, amount]);

  const handleAmountChange = (id: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setAmounts(prev => ({
      ...prev,
      [id]: numValue
    }));
  };

  // Calculate remaining amount
  const remaining = amount - Object.values(amounts).reduce((sum, val) => sum + val, 0);

  return (
    <div className="mt-6 backdrop-blur-3xl rounded-2xl p-4 shadow-sm">
      {validIndividuals.length >= 2 ? (
        <>
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#00ff26]/60">
            <h3 className="font-medium text-gray-200">Exact Amounts</h3>
            <div className="text-sm text-gray-400">
              Total: <span className="font-medium">${amount.toFixed(2)}</span>
              {remaining !== 0 && (
                <span className={`ml-2 ${remaining > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                  ({remaining > 0 ? `+${remaining.toFixed(2)}` : remaining.toFixed(2)})
                </span>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            {validIndividuals.map((person) => {
              const avatar = person.name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
              const personAmount = amounts[person.id] ?? equalAmount; // Fallback to equalAmount if undefined
              return (
                <div key={person.id} className="flex items-center justify-between p-2 hover:bg-gray-700/60 rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#00ff26]/20 flex items-center justify-center text-[#00ff26] font-medium">
                      {avatar}
                    </div>
                    <span className="text-gray-200">{person.name}</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      value={personAmount.toFixed(2)}
                      onChange={(e) => handleAmountChange(person.id, e.target.value)}
                      className="pl-8 pr-3 py-1 w-24 bg-gray-800/60 border border-gray-600 rounded-md text-gray-200 focus:ring-1 focus:ring-[#00ff26] focus:border-[#00ff26]"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-[#00ff26]/60 text-sm text-gray-400">
            <p>
              {remaining === 0 
                ? "Amounts match the total expense"
                : remaining > 0
                  ? `Enter $${remaining.toFixed(2)} more to match the total`
                  : `Reduce by $${Math.abs(remaining).toFixed(2)} to match the total`}
            </p>
          </div>
        </>
      ) : (
        <p className="text-gray-400">Please select at least two individuals</p>
      )}
    </div>
  );
}

export default ExactAmounts;