import React, { PureComponent } from 'react';
import { Box, Flex, Heading, Text, Button } from 'rebass';
import defaultItems from './defaultItems'
import './App.css';

const countBudget = (budget, defaultItems, index = defaultItems.length - 1, filteredItems = []) => {
  let budgetLeft = budget;
  
  if (index < 0) {
    return filteredItems;
  } else {
    if (filteredItems.filter(item => item.name === defaultItems[index].name).length < 1) {
      if (defaultItems[index].price <= budgetLeft) {
        budgetLeft -= defaultItems[index].price;
        filteredItems.push(defaultItems[index]);
      }
    }

    return countBudget(budgetLeft, defaultItems, index - 1, filteredItems);
  }
}

class App extends PureComponent {
  state = {
    budget: 0,
    items: []
  };

  calculateBudget = () => {
    const { budget } = this.state;
    const items = countBudget(budget, defaultItems);
    
    this.setState({ items });
  }
  render() {
    const { budget, items } = this.state;
    return (
      <Box>
        <Flex
          alignItems='center'
          color='white'
          bg='blue'
        >
          <Heading p={3}>
            Budget Calculator
          </Heading>
        </Flex>
        <Flex justifyContent="space-between">
          <Box p={3} width={1/2}>
            <Text py={3}>Input your budget:</Text>
            <Box py={3}>
              <input type={'text'} value={budget} onChange={(e) => this.setState({ budget: e.target.value })} />
            </Box>
            <Button onClick={this.calculateBudget}>OK</Button>
          </Box>
          <Box p={3} width={1/2}>
            <Heading>
              List of items
            </Heading>
            {defaultItems.map((item, index) => (
              <Flex bg={items.filter(i => i.name === item.name).length > 0 ? 'blue' : 'white'} key={index}>
                <Box p={3} width={1}>
                  <Text>{item.name}</Text>
                </Box>
                <Box p={3} width={1}>
                  <Text>{item.price}</Text>
                </Box>
              </Flex>
            ))}
            {items.length > 0 && (
              <Heading>
                Total Cost: {items.reduce((total, item) => total += item.price, 0)}
              </Heading>
            )}
          </Box>
        </Flex>
      </Box>
    );
  }
}

export default App;
