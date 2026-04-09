import { expect } from "chai";
import { ethers } from "hardhat";

describe("DecisionLog", function () {
  async function deployDecisionLogFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const DecisionLog = await ethers.getContractFactory("DecisionLog");
    const decisionLog = await DecisionLog.deploy();
    return { decisionLog, owner, otherAccount };
  }

  it("Should anchor a decision and emit event (REQ-MIRROR-005)", async function () {
    const { decisionLog, owner } = await deployDecisionLogFixture();
    
    const decisionId = "uuid-123";
    const agentId = "agent-456";
    const payloadHash = ethers.keccak256(ethers.toUtf8Bytes("payload-data"));
    const action = "execute";

    await expect(decisionLog.logDecision(decisionId, agentId, payloadHash, action))
      .to.emit(decisionLog, "DecisionLogged")
      .withArgs(decisionId, agentId, payloadHash, action, anyUint);
  });

  it("Should fail if not called by authorized actor", async function () {
    const { decisionLog, otherAccount } = await deployDecisionLogFixture();
    
    const payloadHash = ethers.keccak256(ethers.toUtf8Bytes("payload-data"));
    
    await expect(
      decisionLog.connect(otherAccount).logDecision("id", "agent", payloadHash, "execute")
    ).to.be.revertedWithCustomError(decisionLog, "UnauthorizedLogger").withArgs(otherAccount.address);
  });

  it("Should allow owner-managed caller authorization", async function () {
    const { decisionLog, owner, otherAccount } = await deployDecisionLogFixture();
    const payloadHash = ethers.keccak256(ethers.toUtf8Bytes("payload-data-2"));

    await decisionLog.connect(owner).setAllowedCaller(otherAccount.address, true);
    await expect(
      decisionLog.connect(otherAccount).logDecision("id-2", "agent", payloadHash, "block")
    ).to.emit(decisionLog, "DecisionLogged");
  });

  it("Should reject duplicate payload hash anchoring", async function () {
    const { decisionLog } = await deployDecisionLogFixture();
    const payloadHash = ethers.keccak256(ethers.toUtf8Bytes("duplicate-payload"));

    await decisionLog.logDecision("id-dup-1", "agent", payloadHash, "execute");
    await expect(
      decisionLog.logDecision("id-dup-2", "agent", payloadHash, "block")
    ).to.be.revertedWithCustomError(decisionLog, "HashAlreadyAnchored").withArgs(payloadHash);
  });
});

// Helper for loose timestamp matching
const anyUint = (val: any) => typeof val === "bigint";
