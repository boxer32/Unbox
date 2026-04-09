import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const rootDir = process.cwd();
const outputFile = path.join(rootDir, 'flatten.txt');

const filesToInclude = [
  './agent.md',
  './docs/ux.md',
  './docs/backlog_import_jira_linear.csv',
  './docs/brand.md',
  './docs/risk_register.md',
  './docs/release_checklist.md',
  './docs/sprint_backlog.md',
  './docs/release_evidence_index.md',
  './docs/engineer.md',
  './docs/test_case_matrix.md',
  './docs/backlog_import_linear_native.csv',
  './package.json',
  './packages/contracts/foundry.toml',
  './packages/contracts/test/AgentReputation.ts',
  './packages/contracts/test/AgentReputation.t.sol',
  './packages/contracts/test/DecisionLog.ts',
  './packages/contracts/test/Counter.t.sol',
  './packages/contracts/contracts/DecisionLog.sol',
  './packages/contracts/contracts/AgentReputation.sol',
  './packages/contracts/reputation_test_output.log',
  './packages/contracts/foundry.lock',
  './packages/contracts/script/DeployReputation.s.sol',
  './packages/contracts/script/DeployDecisionLog.s.sol',
  './packages/contracts/script/AuthorizeCaller.s.sol',
  './packages/contracts/script/Counter.s.sol',
  './packages/contracts/agent-reputation-abi.json',
  './packages/contracts/README.md',
  './packages/contracts/package.json',
  './packages/contracts/remappings.txt',
  './packages/contracts/foundry_test.log',
  './packages/contracts/hardhat.config.ts',
  './packages/contracts/src/Counter.sol',
  './packages/backend/sync_test_output.log',
  './packages/backend/test_output.log',
  './packages/backend/src/index.ts',
  './packages/backend/src/adapter/agent-adapter.ts',
  './packages/backend/src/adapter/__tests__/agent-adapter.spec.ts',
  './packages/backend/src/workers/explanation-worker.ts',
  './packages/backend/src/workers/__tests__/explanation-worker.spec.ts',
  './packages/backend/src/engine/counterfactual-engine.ts',
  './packages/backend/src/engine/__tests__/counterfactual-engine.spec.ts',
  './packages/backend/src/engine/mirror-engine.ts',
  './packages/backend/src/engine/__tests__/mirror-engine.spec.ts',
  './packages/backend/src/services/blockchain-service.ts',
  './packages/backend/src/services/__tests__/blockchain-service.spec.ts',
  './packages/backend/src/services/reputation-service.ts',
  './packages/backend/src/services/__tests__/reputation-sync.spec.ts',
  './packages/backend/src/services/settlement-service.ts',
  './packages/backend/src/gateway/x402-gateway.ts',
  './packages/backend/src/gateway/__tests__/x402-flow.spec.ts',
  './packages/backend/src/store/decision-store.ts',
  './packages/backend/scratch/verify-sync.ts',
  './packages/backend/package.json',
  './packages/backend/README.md',
  './packages/shared/index.ts',
  './packages/shared/package.json',
  './packages/shared/types/decision.ts',
  './packages/shared/types/agent-reputation-abi.ts',
  './packages/shared/types/decision-log-abi.ts',
  './packages/dashboard/index.html',
  './packages/dashboard/package.json',
  './packages/dashboard/postcss.config.js',
  './packages/dashboard/tailwind.config.ts',
  './packages/dashboard/vite.config.ts',
  './packages/dashboard/src/main.tsx',
  './packages/dashboard/src/providers/Web3Provider.tsx',
  './packages/dashboard/src/styles/globals.css',
  './packages/dashboard/src/components/DecisionStream.tsx',
  './packages/dashboard/src/components/WalletConnect.tsx',
  './packages/dashboard/src/components/DashboardLayout.tsx',
  './packages/dashboard/src/components/ReputationCard.tsx',
  './packages/dashboard/src/routeTree.gen.ts',
  './packages/dashboard/src/routes/__root.tsx',
  './packages/dashboard/src/routes/index.tsx',
  './packages/dashboard/src/routes/feed.tsx',
  './packages/dashboard/src/routes/mirror.lazy.tsx',
  './packages/dashboard/src/routes/decisions.$decisionId.tsx',
  './packages/reports/s1/integration/mirror_report.md',
  './packages/reports/s2/integration/counterfactual_report.md',
  './packages/reports/s3/integration/reputation_sync_report.md',
  './packages/reports/s3/contracts/reputation_foundry_report.md',
  './packages/reports/s4/audit/settlement_split_audit.md',
  './packages/reports/s4/e2e/feed_gateway_report.md',
  './Unbox_PRD_v0.1.md'
];

const header = `================================================================
UNBOX PROJECT CODEBASE FLATTEN
Timestamp: ${new Date().toISOString()}
================================================================
`;

fs.writeFileSync(outputFile, header);

filesToInclude.forEach(file => {
  const absolutePath = path.resolve(rootDir, file);
  if (fs.existsSync(absolutePath)) {
    const content = fs.readFileSync(absolutePath, 'utf8');
    const separator = `\n================================================================\nFILE: ${file}\n================================================================\n`;
    fs.appendFileSync(outputFile, separator + content);
  } else {
    console.warn(`File not found: ${file}`);
  }
});

console.log('flatten.txt created successfully.');
