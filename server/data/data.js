/*
{
  title:
  snippet:
  premium_only:
  language:
}
*/

const snippets = [
  {
    title: "Hello World",
    snippet: `function HelloWorld() {
      console.log("Hello World!");
    }`,
    premium_only: false,
    language: "javascript",
  },
  {
    title: "Hash Password with Bcrypt",
    snippet: `bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
          // Store hash in your password DB.
      });
    });`,
    language: "javascript",
  },
  {
    title: "Generate Fibonacci Numbers",
    snippet: `List<int> fibonacci(int n) {
    int last = 1;
    int last2 = 0;
    return List<int>.generate(n, (int i) {
      if (i < 2) return i;
      int curr = last + last2;
      last2 = last;
      last = curr;
      return curr;
    });
  }
  EXAMPLES
  fibonacci(6); // [0, 1, 1, 2, 3, 5]`,
    premium_only: false,
    language: "dart"
  },
  {
    title: "Robot Paths",
    snippet: `// Finding how many possible paths can a robot take
  
    // A Board class will be useful
    var makeBoard = function(n) {
      var board = [];
      for (var i = 0; i < n; i++) {
        board.push([]);
        for (var j = 0; j < n; j++) {
          board[i].push(false);
        }
      }
    
      board.togglePiece = function(i, j) {
        this[i][j] = !this[i][j];
      }
    
      board.hasBeenVisited = function(i, j) {
        return !!this[i][j];
      }
    
      return board;
    };
    
    var robotPaths = function (n) {
      // the amount of paths
      var paths = 0;
      // make the board
      var board = makeBoard(n);
      // recursive fn to find all possible robot paths
      var findPaths = function (i, j) {
        // if a path has been found add it to the paths count
        if (i === n - 1 && j === n - 1) {
          paths++;
          return;
        }
        // if it has run out of bounds, return
        if (i < 0 || i >= n || j < 0 || j >= n) {
          return;
        }
        // if the spot has already been visited then return
        if (board.hasBeenVisited(i, j)) {
          return;
        } else {
          // toggle a piece on the board
          board.togglePiece(i, j);
          // go right
          findPaths(i, j + 1);
          // go down
          findPaths(i + 1, j);
          // go left
          findPaths(i, j - 1);
          // go up
          findPaths(i - 1, j);
          // toggle the piece back
          board.togglePiece(i, j);
        }
      };
    
      findPaths(0, 0);
      // return the number of paths
      return paths;
    };
    
    // article for demonstration, credit to: http://rvbsanjose.github.io/robot-paths/`,
    premium_only: true,
    language: "javascript"
  },
  {
    title: "Python Date and time",
    snippet: `from datetime import datetime

    presentime = datetime.now()
    
    print(" NOW THE TIME IS:", presentime)
    
    print("Todays Date is:", presentime.strftime('%Y-%m-%d') )
    
    print("Year is:", presentime.year)
    
    print("MOnth is:", presentime.month)
    
    print("Day is:", presentime.day)`,
    premium_only: false,
    language: "python"
  },
  {
    title: "Reverse Linked List",
    snippet: `def reverseList(self, head: ListNode) -> ListNode:      
          
    prev = None
    curr = head
  
    while curr:
      next_node = curr.next
      curr.next = prev
      prev = curr
      curr = next_node
  
  
    return prev`,
    premium_only: false,
    language: "python"
  },
{
    title: "Arrange list of numbers in ascending order",
    snippet: `#include <stdio.h>

    void sort_numbers_ascending(int number[], int count)
    {
       int temp, i, j, k;
       for (j = 0; j < count; ++j)
       {
          for (k = j + 1; k < count; ++k)
          {
             if (number[j] > number[k])
             {
                temp = number[j];
                number[j] = number[k];
                number[k] = temp;
             }
          }
       }
       printf("Numbers in ascending order:\n");
       for (i = 0; i < count; ++i)
          printf("%d\n", number[i]);
    }
    void main()
    {
       int i, count, number[20];
     
       printf("How many numbers you are gonna enter:");
       scanf("%d", &count);
       printf("\nEnter the numbers one by one:");
       
       for (i = 0; i < count; ++i)
          scanf("%d", &number[i]);
     
       sort_numbers_ascending(number, count);
    }`,
    premium_only: true,
    language: "c"
  },
  {
    title: "Hello World ExpressJS",
    snippet: `
    const express = require('express')
    const app = express()
    const port = 3000
    
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    
    app.listen(port, () => {
      console.log("Example app listening at port " + port)
    })`,
    premium_only: false,
    language: "javascript"
  },
  {
    title: "ReactDom Render",
    snippet: `import React from 'react';
    import ReactDOM from 'react-dom';
    
    class Test extends React.Component {
      render() {
        return <h1>Hello World!</h1>;
      }
    }
    
    ReactDOM.render(<Test />, document.getElementById('root'));
    `,
    premium_only: false,
    language: "javascript"
  },
  {
    title: "Multiple Regression",
    snippet: `import pandas
    from sklearn import linear_model
    
    df = pandas.read_csv("cars.csv")
    
    X = df[['Weight', 'Volume']]
    y = df['CO2']
    
    regr = linear_model.LinearRegression()
    regr.fit(X, y)
    
    #predict the CO2 emission of a car where the weight is 2300kg, and the volume is 1300cm3:
    predictedCO2 = regr.predict([[2300, 1300]])
    
    print(predictedCO2)`,
    premium_only: true,
    language: "python"
  },
  {
    title: "Validate Sudoku Board",
    snippet: `
    def isValidSudoku(self, board: List[List[str]]) -> bool:
      seen = set()
      for i in range(9):
          for j in range(9):
              num = board[i][j]
              row = f"{num} row {i}"
              col = f"{num} col {j}"
              square = f"{num} square {i//3},{j//3}"
              if num != '.':
                  if row in seen or col in seen or square in seen:
                      return False
                  else:
                      seen.add(row)
                      seen.add(col)
                      seen.add(square)
      
      return True`,
    premium_only: true,
    language: "python"
  }
];

module.exports = snippets;

