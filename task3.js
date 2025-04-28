// Function to calculate compound interest
function calculateCompoundInterest(principal, rate, years) {
    // Validate inputs
    if (principal <= 0 || rate <= 0 || years <= 0) {
      console.error("Principal, rate, and years must be positive numbers.");
      return null;
    }
  
    // Calculate final amount using compound interest formula: A = P * (1 + r)^n
    const finalAmount = principal * Math.pow(1 + rate, years);
    
    // Calculate interest earned
    const interestEarned = finalAmount - principal;
  
    // Store results in an object
    const results = {
      finalAmount: finalAmount.toFixed(2),
      interestEarned: interestEarned.toFixed(2)
    };
  
    // Print results
    console.log(`Principal: $${principal.toFixed(2)}`);
    console.log(`Annual Interest Rate: ${(rate * 100).toFixed(2)}%`);
    console.log(`Time Period: ${years} years`);
    console.log(`Final Amount: $${results.finalAmount}`);
    console.log(`Interest Earned: $${results.interestEarned}`);
  
    // Return results for potential further use
    return results;
  }
  
  // Example usage with sample inputs
  const principal = 1000; // $1000
  const rate = 0.05; // 5% annual interest rate
  const years = 10; // 10 years
  
  calculateCompoundInterest(principal, rate, years);