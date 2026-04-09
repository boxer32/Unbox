import { expect } from "chai";
import { ethers } from "hardhat";

describe("AgentReputation", function () {
  async function deployReputationFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const AgentReputation = await ethers.getContractFactory("AgentReputation");
    const reputation = await AgentReputation.deploy();
    return { reputation, owner, otherAccount };
  }

  it("Should mint a new identity and block transfers (REQ-REP-001)", async function () {
    const { reputation, owner, otherAccount } = await deployReputationFixture();
    
    await reputation.mintIdentity(owner.address);
    expect(await reputation.ownerOf(1)).to.equal(owner.address);

    // Attempt transfer
    await expect(
      reputation.transferFrom(owner.address, otherAccount.address, 1)
    ).to.be.revertedWith("SBT: Transfer not allowed");
  });

  it("Should calculate weighted score correctly (REQ-REP-002)", async function () {
    const { reputation, owner } = await deployReputationFixture();
    
    await reputation.mintIdentity(owner.address);
    
    // Quality 80, Security 90, Efficiency 70, Transparency 100
    // (80*35 + 90*30 + 70*20 + 100*15) / 100 
    // (2800 + 2700 + 1400 + 1500) / 100 = 8400 / 100 = 84
    await reputation.updateScore(1, 80, 90, 70, 100);
    
    const score = await reputation.getScore(1);
    expect(score.weightedScore).to.equal(84);
  });

  it("Should fail score update if not owner", async function () {
    const { reputation, otherAccount } = await deployReputationFixture();
    await reputation.mintIdentity(otherAccount.address);
    
    await expect(
      reputation.connect(otherAccount).updateScore(1, 100, 100, 100, 100)
    ).to.be.revertedWithCustomError(reputation, "OwnableUnauthorizedAccount");
  });
});
