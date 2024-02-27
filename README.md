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
![UML_Design](https://www.plantuml.com/plantuml/dpng/hLPXQoCt4FtkNp5mNsIIG3beAQ4jvnnECSt5mJ5fQGcBl1hRwccbHTAkOzhcjvVLobfPknVxuBubetcZcQStR_t1MAfjLOYHMlsDkOKxtA1a_um00AxWGVEQMeIQQavN0esBNy13jH8yJyBlOFfYKKigO5t9t78b3HaV8zA3xehqv1MUEEwEml-DHbnQr6kQ8ypcEucwRVHUWR7zFh56QS7bcIqlbvfAiqQjaP5IOyrLPTpXDL36D1e3N39yGNOfSJTyCcud3Ms1QjB866gEkv3TT9eBQWn4JLw5Mfa3kI10eHXVSzIWfDYxzC1PhgInkigjwcBM3n6c8hrUnwwKZwsK4fvFtsh8I_YSBZw-_swfFgCyWzG3bsIjLT7d3wmQ2DPKL7WD5PVs_VS_ZADoaxBKggQ2gE7t05EYPAZFBFekq4GqvhpaA6s0NW8jL2LjXmaiDKZgMa6It7W25YwyrQeW9eL-THTMMIeUgx8K-o0kd-WpLbHGcUDyJMYUgoegFPnFXL2x1f5m7BWzWMUOyu8AGyPGLjep_cEdz4u-SD2xiPhB3MII5fY4pBvOAU63_YB8egdzKK7BiW7yTNZtdtyvf3z3vZamnybHRXnAuSzGUkl90ZScNKgfx9-erSIz5KcVR61FcrcpQp_d9RHpXe17V3ErG5BlQ-L-yMMvfwWJL1mvJKC26H-6zi6MYZHyhFHZqRs-9V8qDRpXiILT9eEbm8itX1sPenFs8nKuRVpAdE6G3c4UAfrlgK56LjL-qBzI8gCIpNsFLfKbCk9ekgqaCmlA3R91W3l_dTijqtGdoHkbRr3YckUSwlt7BPKRP4G95aK7EfMuUojXt7b1OAltvUjSOjA6aeIIxXiYOTLTb9Z4Hb41IGmbkn4g_vo4tLvIQU7Jv8ziEVzjUfzDdYQpkydDtJIxdI-onydTz3JcORh8PlTFqyVbV95akrTffrM2-KEtcDmqyqzooslqfj9w1CnaZQQnYdNpMkr_qNjUWZrMJdp22nn2R6aNTTUFl-Y8uVfduFwldkcPqFbStojBncb2JGLdhH6uZ7ECCRFHgqVkbArIJKKwE1HQLVjsdqXBpbBTLFlkkaDwsdc_KRJRoN2lnggoUJ8I_NnAwnt6SXiJxGB9-hin_5CizVz60aiLGKzU_meRj4U0S5jt_gkY8dLJTp3rcp9uk3nISo_5QJfHHfZAbxYDDKso4wxj88bHdWdgDk4i23TXxVh9wH2jmxfH1dbQO46vv7BZdy_bHvaGyVtIYeKzKL5XRqzERrBojMfgVg8lhOFMb8j6zhTAU-M63zWmuW5re259Rinxrghkft-lhi3zEOe2dNF7qU3qercNq0EadyyKE_g0abM5-1y0)