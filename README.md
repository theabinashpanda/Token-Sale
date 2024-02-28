# Token Sale Project

This project aims to implement a token sale for an ERC20 token with specific functionalities as outlined in the assignment. The goal is to raise funds of 2 ETH by selling ERC20 tokens to investors.

## Project Description
- Investors can participate in the token sale by sending ETH.
- Upon purchase, tokens are immediately distributed to the respective investors. 
- The token sale automatically stops once the minimum fundraising goal of 2 ETH is achieved, and further token sale is disallowed.
- Additionally, the token sale concludes after 32 blocks are produced post-contract deployment. 
- After the token sale ends, there's a provision to transfer all ETH from the smart contract to a specific external address.
- This project ensures a streamlined process for fundraising through token sale while maintaining security and efficiency.

## UML Design
![UML_Design](https://www.plantuml.com/plantuml/dpng/hLRlQoCt4FtklsBWlcX90kMWfOIsd7CunJGN1yUafIKiycfigwUL5acxZkcFlxsiLjRAsht4BVsMpCmRpJmzlVK7OwcsTIacQlqx5XRkS8kI_J410BY21yqRQX4QgZbT2pGkVW4FzLhm8Wc_WzcBHIsfW4qj2ykLD2GxHQI9_eWqypSySToVXF-QJBYqg3UqG9WlzX9rD-Yz0cE7SsA3qeAhCpjUhJILPeDQ8oELneQhshZaDL36D1e3N39yGNOfSJ-UoRfDmrYWsZAIGSDn7whRIGj1ZO5eoAlGAtSW5mGe5UCRZXgK50TN7ZWhb3HMruLLVSpw9S9MP31hvbkvs5efuVdqeuQwXC_PykFxhrRgCyepI3roIJPQbKF-mAgHO4D5ZTTGSsdVV_rD5hMRLfLM3HL4ZTy7c0ebGtrcqtU19gAnu1L7QGFq4cYfQcbxJCUIHr8t2X9_ufkmvC1RhKfYKkY_di8gIyLZNLNYuCKL2dt5cWeg2rni22qALKUjn-kf46hV8XAEXzoEunaMlAJ2a0ogMdl6l-sLtii7ZdetLdEvXLpI4fEGEPHh9NpG7mHvjBLFbRIgMi1lntl__eTZ-JFadWDpMXpLng4K_WoLjvuyS6FIHocL_HMrchgx8icLZRtJTjVyskzv2TsU8U0H_vjQmFVxhtA_-BBSKzGRL9muJKi2oOvB-s17HHe-LNhevvElY3mj3NTuQacNoM8fyE8LOKVcw8JzI0NEMhyoPpYaGvY7MXSxQf2HTNqOzQ-KoAX5UzwZLLM5Z3YQRcl9p99oWsmKuF8_SxjZckubUQNr3KhSy89JVVYuetABZ2Z1ekZ8f1BthnLalHS4jWPVljubfbqeAQZeeIKIrlr1YKbi5HMGn52o6w6ApqdOlKigBNoQ_fAl5Z_DxlFfqtH-Dxsvc-MtYsN-EBsRlOrvc2tp-VtJx76rM2RLxbQwRPLWFkaU9ZVj_jF2yWQzgNGU0NFPe6cjOjFULlTVT9-NO6Fbd6PuYME87UsZxlZiYuuOZdy6xlyQc9wX0k-LxOOdMPfkgE2iiu65lbTdsM9kepkFl2bVfugAL71ijAuFtMiYsJ5rEkDm9BIxwVXKnggglHeIVYQb6n_7T-yYKZp9nr_0y0TNwlBjHQzKt2g2UF_QeZqf2Dtx_8-AYjGZNMBczJ-QN9reT5WIAxKZpvjvt-8sLYh9N_LY3qdixqnGh--p8DmNAprId2xH-QPRPPId9PQKIowt_hfSVLG94TyldJZO4nKr3lJ_zWj9la5jpq_qfVF5XdBHIlnMQQ_Jy5aQHpoW3ZGanQqbppk9V_VdrHLqWei2lH_7qU3VatbVC02a7yKKE_c0ajMb-0S0)

## Getting started
- Clone the repository by running the following commands.

    ```
    git clone https://gitlab.mindfire.co.in/abinash.p/assignment-2-token-sale
    ```

- Setup the hardhat by following link: [Click here](https://hardhat.org/hardhat-runner/docs/getting-started)