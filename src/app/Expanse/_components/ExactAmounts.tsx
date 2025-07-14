function ExactAmounts({ individuals,amount }: { individuals: {id: string, name: string}[],amount:number }) {
  // Dummy data
 const validIndividuals = individuals?.filter(person => person.name && person.name.trim() !== '') || [];
    const equalAmount = amount / validIndividuals.length;

  const groupMembers = validIndividuals.map((person) => ({
        id: person.id,
        name: person.name,
        avatar: person.name.split(' ').map((n: string) => n[0]).join('').toUpperCase(),
        amount: equalAmount
    }));



  return (
    <div className="mt-6 backdrop-blur-3xl rounded-2xl p-4 shadow-sm">
        {validIndividuals?.length === 2 ? (
            <>
            
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#00ff26]/60">
        <h3 className="font-medium text-gray-200">Exact Amounts</h3>
        <div className="text-sm text-gray-400">
          Total: <span className="font-medium">${amount.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {groupMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-2 hover:bg-gray-700/60 rounded-md">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#00ff26]/20 flex items-center justify-center text-[#00ff26] font-medium">
                {member.avatar}
              </div>
              <span className="text-gray-200">{member.name}</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                type="number"
                defaultValue={member.amount.toFixed(2)}
                className="pl-8 pr-3 py-1 w-24 bg-gray-800/60 border border-gray-600 rounded-md text-gray-200 focus:ring-1 focus:ring-[#00ff26] focus:border-[#00ff26]"
                />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-[#00ff26]/60 text-sm text-gray-400">
        <p>Enter exact amounts for each member</p>
      </div>
</>
) : (
    <p>Please select at least two individuals</p>
)}
    </div>
);
}

export default ExactAmounts;