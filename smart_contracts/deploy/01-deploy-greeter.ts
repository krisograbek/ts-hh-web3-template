import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/dist/types'


const deployGreeter: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("Deploying Greeter by ", deployer)
  const greeter = await deploy("Greeter", { // contract name
    from: deployer,
    args: ["Initial Hello!"],
    log: true
  })
  log(`Deployed Greeter to ${greeter.address}`)
}

export default deployGreeter;