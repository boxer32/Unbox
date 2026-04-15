import { ReputationService } from '../src/services/reputation-service';
import { BlockchainService } from '../src/services/blockchain-service';

async function main() {
  const blockchain = new BlockchainService();
  const service = new ReputationService(blockchain);
  
  console.log("--- Starting Integrated Score Sync Test ---");
  
  // 1. Mock a risky decision that should lower the score
  const mockPayload: any = {
    decisionId: "test-sync-1",
    action: "block", // Should trigger -2 Security, -1 Quality
    agentId: "alpha-trader"
  };

  const newScores = await service.evaluateDecision(mockPayload);
  console.log("Computed Scores:", newScores);

  // 2. Push to local Anvil
  // Using Token ID 1 
  await service.pushScoreUpdate(1, newScores.q, newScores.s, newScores.e, newScores.t);
  
  console.log("--- Sync Test Complete ---");
}

main().catch(console.error);
