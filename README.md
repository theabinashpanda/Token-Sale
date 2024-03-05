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
![UML_Design](https://www.plantuml.com/plantuml/dpng/hLPXQ-is5FtUNt5XNsHU2-F1nYZRUEaZ7M5zJKb3DpQAaQsRH7koP2JPQTZMtpuiAxOi-pNPsBVstdEkTEyzEiu7OwcsLI4kLFO7vXRkS8kI_Na107053vhNr2BKL7EQ2JGk_WuUgapmF0f_1VCNYrfI0PjAvfOhQKWoPCI9_eWuymfF7FU3yDyN5rnQr1kQ8ooMUucwlUYz0cF7zyGQfGM7CpjUhZMLPeDQ8oEbnfghohZaDL36D1e3N39yGNOfSJ-TINodrjVgYfCH9Rc6J2dX2Qh9aGHgZliEqdIK2seC1CrSTMUcZkI208LYVCDHWvBYuE3TR7CbZTLLRbKVE-U2VQdWgg_7gtQuQExprSVtNw_LPvHd3FyuSxBHgXZF6QoQ2DPKL7WD5PVs_JVV9a6vMLbgLLD1rFJUm9Ge6UgJHUCz4eqvBpbAsr4lWHQgahRd31PAtLMG-1DFqg83RxKgY8cf__eMLbag7gko50SlhWxe4HaLLEQut12QvweAIa_ZgH1gtp2Y6OzdEyrdcFE22aCIA2lj9_vTh_HUFd3Kkx6QoosaaXOOXSoXo9JmGNyGf47NFbNGicm8ln_t_iEFH_Wpf7u6PWWEiK4efZz3wIqgxMPZuaSfbVqDjPgvNP5ePLFljEarlVPzNaBRPnVmZFzDBU3h_LUvl_kot6FMYL4CdAOP0acEJRT1FueuF5JwK7IlRuWyXlRw7bhIPTHOJ7ptXh03StJ2VgG2vurVcJCSqZ7CGwNp7JN8I5OT9lqh7cHGeZdlqQgoH4RSc6uhoSoASeDiak3olt2xOvhk9NcZz0rAtF2SKttukADoYumemOBen4qbxjy29BqNTDCQVVbwbvYreGXGqaCpICZwWoAJs2eg88gXP3T2vP-Zi7kNL5huDFirNIz_dj-diwVPucvsSpTFRvUhz75sDp_DUPYlqiNzq_nnlLn5QBULjbibc4-wXybDq_yijxn6RogjHy12rcWQgzWqssh_2_Pv2JPKpZ332vnYx6WVTSSdNtJ4xlXduFwlaUaPAl1UsVRo98dJDHMSjJQmrFVgB5jCRR3pm9lIB51Kh89ZeQmwjA-99CVKy8xZAw7TpQPlPQmgczMG_cTIrF7n-kvT18edwVGB6F_WYbs-MVHQXQK2YlUlBTe1eAlUvtzILCGUwH9ph__9v7gWqJ4aL6exlDxCVOdRKAaaFU75ZXBPtvcaNjzdKRW7Apq1ZfjeVTErCZcd5HQKIowtVbqE7o0XcFTBAmxsH4M58_sVVY7HDwYf-Oc-jBvOKouQYTygxNNQVvOc6G-ekp54uCQI5wt4l__hwWfQmGM1te-3QE_V5uiUC2B47yMO-m4bgmhn3m00)

## Getting started
- Clone the repository by running the following commands.

    ```
    git clone https://gitlab.mindfire.co.in/abinash.p/assignment-2-token-sale
    ```

- Setup the hardhat by following link: [Click here](https://hardhat.org/hardhat-runner/docs/getting-started)

- Install ethers by running the following command:
    ```
    npm i ethers
    ```