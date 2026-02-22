export const topicContent = {
    'arrays': {
        title: 'Arrays & Hashing',
        theory: `Arrays are contiguous blocks of memory. They offer O(1) time complexity for reading/writing at a specific index. Hashing involves mapping keys to values using a hash function, allowing for O(1) average time complexity for insertions, deletions, and lookups. Hash maps (or dictionaries) are frequently used to count occurrences, track seen elements, or map relationships between data.`,
        questions: [
            'What is the difference between an Array and a Linked List?',
            'How does a Hash Table handle collisions?',
            'Explain the time complexity of searching in an unsorted array vs a Hash Table.'
        ],
        task: 'Implement a function `twoSum(nums, target)` that returns the indices of two numbers such that they add up to target. Use a hash map for an O(n) solution.'
    },
    'two-pointers': {
        title: 'Two Pointers',
        theory: `The Two Pointer technique typically involves using two variables to keep track of indices in an array or string. They can move towards each other, in the same direction, or independently. It's highly effective for problems involving sorted arrays, finding pairs, or reversing elements in-place to achieve O(n) time complexity and O(1) space complexity.`,
        questions: [
            'When should you consider using the Two Pointer technique?',
            'How is Two Pointers different from Sliding Window?',
            'What must be true about an array for a Two Pointer approach (from opposite ends) to find a pair sum?'
        ],
        task: 'Write a function `isPalindrome(s)` that checks if a string is a palindrome, ignoring non-alphanumeric characters and case, using two pointers from opposite ends.'
    },
    'sliding-window': {
        title: 'Sliding Window',
        theory: `Sliding Window is an extension of Two Pointers focused on contiguous sub-arrays or sub-strings. You maintain a "window" of elements (usually defined by a left and right pointer) across the input. The window expands and contracts based on specific conditions, making it ideal for problems asking for the "longest", "shortest", or "max/min" contiguous subsegment.`,
        questions: [
            'What defines a "fixed" vs "variable" sliding window?',
            'How do you update the window state when expanding vs contracting?',
            'Give an example scenario where sliding window is significantly better than a brute force approach.'
        ],
        task: 'Implement `maxProfit(prices)` to find the maximum profit you can achieve from buying and selling a stock once (the classic sliding window/dynamic programming problem).'
    },
    'stacks': {
        title: 'Stacks & Queues',
        theory: `Stacks follow LIFO (Last In, First Out) ordering. They are naturally implemented using arrays or linked lists and are fundamental to concepts like recursion, expression parsing, and backtracking. Queues follow FIFO (First In, First Out) ordering and are used in breadth-first search (BFS) and task scheduling.`,
        questions: [
            'How can you implement a Queue using two Stacks?',
            'What are common use cases for a Stack?',
            'Describe a Monotonic Stack and what it is used for.'
        ],
        task: 'Write a function `isValid(s)` that takes a string of parentheses brackets `()[]{}` and determines if the input is valid using a stack.'
    },
    'binary-search': {
        title: 'Binary Search',
        theory: `Binary Search is a divide-and-conquer algorithm that finds the position of a target value within a sorted array in O(log n) time. It repeatedly divides the search interval in half. The key is clearly defining the search space and the condition that allows you to safely discard half of it.`,
        questions: [
            'What is the required precondition for Binary Search?',
            'How do you prevent integer overflow when calculating the mid-point (`(left+right)/2`)?',
            'How can Binary Search be applied to an answer space rather than an index space?'
        ],
        task: 'Write `search(nums, target)` which applies binary search to find `target` in a sorted array `nums` returning its index, or -1 if not found.'
    },
    'linked-lists': {
        title: 'Linked Lists',
        theory: `Linked Lists consist of nodes where each node contains data and a reference (pointer) to the next node in the sequence. Unlike arrays, they do not require contiguous memory, allowing for O(1) insertions/deletions at known positions, but O(n) access time since you must traverse from the head.`,
        questions: [
            'What is the difference between a Singly and Doubly Linked List?',
            'How do you detect a cycle in a Linked List?',
            'Explain the "Fast and Slow Pointer" technique (Floyd\'s Tortoise and Hare).'
        ],
        task: 'Implement a function `reverseList(head)` that reverses a singly linked list in-place.'
    },
    'trees': {
        title: 'Trees & BSTs',
        theory: `A Tree is a hierarchical data structure composed of nodes. A Binary Search Tree (BST) specifically enforces the property that a node\'s left child is smaller and its right child is larger. Tree traversal algorithms (In-order, Pre-order, Post-order, Level-order) form the foundation of most tree algorithms.`,
        questions: [
            'What are the time complexities for search, insert, and delete in a balanced and unbalanced BST?',
            'What is the difference between DFS and BFS on a Tree?',
            'What is an AVL tree or Red-Black tree designed to solve?'
        ],
        task: 'Write a function `maxDepth(root)` that returns the maximum depth (number of nodes along the longest path from root to leaf) of a binary tree.'
    },
    'graphs': {
        title: 'Graphs (BFS / DFS)',
        theory: `Graphs model relationships mapping entities (vertices/nodes) to concepts (edges). Edges can be directed or undirected, weighted or unweighted. BFS explores level-by-level using a queue (finding shortest paths in unweighted graphs), while DFS explores as far as possible along a branch before backtracking using recursion or a stack.`,
        questions: [
            'What are the different ways to represent a graph in code?',
            'When would you choose BFS over DFS?',
            'What is Topological Sort and when is it applicable?'
        ],
        task: 'Implement a function `numIslands(grid)` that counts the number of islands (connected components of \'1\'s) in a 2D grid using DFS or BFS.'
    },
    'dp': {
        title: 'Dynamic Programming',
        theory: `Dynamic Programming solves complex problems by breaking them down into simpler subproblems and storing the results of subproblems to avoid redundant computation (memoization/tabulation). It applies when a problem exhibits overlapping subproblems and optimal substructure.`,
        questions: [
            'What is the difference between Top-Down (Memoization) and Bottom-Up (Tabulation) DP?',
            'How do you typically identify that a problem can be solved with DP?',
            'Explain the difference between DP and Divide and Conquer.'
        ],
        task: 'Write `climbStairs(n)`, where you can climb 1 or 2 steps at a time. Return how many distinct ways you can climb to the top using DP.'
    },
    'scaling': {
        title: 'Scaling Fundamentals',
        theory: `Scaling entails expanding a system\'s capacity. Vertical scaling (scaling up) means adding more power (CPU, RAM) to an existing machine. Horizontal scaling (scaling out) means adding more machines to the pool. Horizontal scaling is generally preferred for modern web architectures due to better resilience and cost-efficiency at high loads.`,
        questions: [
            'What are the limits of vertical scaling?',
            'What challenges arise when you horizontally scale a stateful application?',
            'What is the CAP Theorem?'
        ],
        task: 'Draw out (or describe) a high-level architecture diagram showing a single-server setup migrating to a horizontally scaled setup behind a load balancer.'
    },
    'load-balancing': {
        title: 'Load Balancing',
        theory: `Load balancers distribute incoming network traffic across multiple servers. This ensures no single server bears too much demand, improving responsiveness and availability. They can operate at Layer 4 (Transport, TCP/UDP) or Layer 7 (Application, HTTP) and use algorithms like Round Robin, Least Connections, or IP Hash.`,
        questions: [
            'What is the difference between a Layer 4 and Layer 7 load balancer?',
            'How does a load balancer know if a backend server is healthy?',
            'What is "sticky sessions" or "session affinity"?'
        ],
        task: 'List three popular load balancing algorithms and write a sentence describing when you might use each.'
    },
    'caching': {
        title: 'Caching Strategies',
        theory: `Caching stores copies of frequently accessed data in a fast, temporary storage layer (like RAM) to reduce the time it takes to serve future requests for that data. Common strategies include Cache-Aside, Read-Through, Write-Through, and Write-Back. Managing cache invalidation is one of the hardest problems in distributed systems.`,
        questions: [
            'What is the difference between Cache-Aside and Write-Through caching?',
            'What happens when a cache memory fills up? (Eviction policies like LRU, LFU)',
            'What is a "cache stampede" and how might you prevent it?'
        ],
        task: 'Design a simple Cache-Aside wrapper function in pseudocode that checks the cache first, and if missing, reads from a database, saves to the cache, and returns the data.'
    },
    'databases': {
        title: 'SQL vs NoSQL',
        theory: `SQL databases (like PostgreSQL, MySQL) are relational, use structured schemas, and typically guarantee ACID properties. NoSQL databases (like MongoDB, Cassandra, DynamoDB) are non-relational, have highly flexible schemas, and often prioritize scalability and performance via BASE semantics, sacrificing strict consistency for availability.`,
        questions: [
            'When would you strictly choose a Relational (SQL) Database over NoSQL?',
            'Explain the differences between Document, Key-Value, Column-Family, and Graph NoSQL databases.',
            'What is database sharding and when is it necessary?'
        ],
        task: 'Define a simple schema for a "User profile and their posts". Do it once applying normal forms for SQL, and once as a JSON document structure for a Document DB.'
    },
    'api-design': {
        title: 'API Design',
        theory: `APIs (Application Programming Interfaces) define how software components communicate. REST (Representational State Transfer) is a common architectural style using standard HTTP methods (GET, POST, PUT, DELETE) and resource-based URLs. GraphQL and gRPC are alternative modern API paradigms offering different trade-offs in payload flexibility and performance.`,
        questions: [
            'What makes an API "RESTful"?',
            'What are the trade-offs of using GraphQL vs REST?',
            'How do you handle API versioning?'
        ],
        task: 'Design the REST endpoints (URLs and HTTP methods) required for a basic CRUD application to manage "Books" in a library.'
    },
    'star': {
        title: 'STAR Method Practice',
        theory: `The STAR method is a structured manner of responding to behavioral interview questions. STAR stands for Situation (set the scene), Task (describe your responsibility), Action (explain exactly what YOU did), and Result (share the outcome, quantified if possible).`,
        questions: [
            'Tell me about a time you failed.',
            'Describe a situation where you had to work under a tight deadline.',
            'What is your proudest professional achievement?'
        ],
        task: 'Draft one complete STAR story for a technical project you built recently. Keep it under 2 minutes when spoken aloud.'
    },
    'teamwork': {
        title: 'Teamwork Stories',
        theory: `Interviewers ask teamwork questions to gauge your collaboration skills, empathy, and ability to elevate those around you. Good teamwork stories highlight communication, shared goals, division of labor, and how you supported struggling teammates.`,
        questions: [
            'Tell me about a time you disagreed with a team member. How did you resolve it?',
            'Describe a time you had to rely on others to accomplish a goal.',
            'Have you ever worked with a difficult colleague? How did you handle it?'
        ],
        task: 'List three discrete scenarios from your past experience where you collaborated with others to solve a tough engineering or design problem.'
    },
    'conflict': {
        title: 'Conflict Resolution',
        theory: `Conflict resolution stories show your maturity. The focus shouldn't be on the fact that conflict existed (conflict is normal), but on your process for de-escalating, listening, finding compromises, and maintaining professional relationships productively.`,
        questions: [
            'Tell me about a time you strongly disagreed with your manager.',
            'How do you handle pushback on a technical design you proposed?',
            'Describe a situation where miscommunication caused a major issue.'
        ],
        task: 'Write a script of how you would respond if a senior engineer bluntly rejected your pull request without giving constructive reasons.'
    },
    'leadership': {
        title: 'Leadership Examples',
        theory: `You don\'t need a management title to show leadership. Leadership in interviews often means taking initiative, owning an ambiguous problem from start to finish, mentoring junior engineers, or recognizing a process inefficiency and fixing it autonomously.`,
        questions: [
            'Tell me about a time you took the lead on a project.',
            'Describe a situation where you saw a problem and took initiative to fix it without being asked.',
            'How do you balance guiding others while ensuring you complete your own work?'
        ],
        task: 'Identify a time when you stepped out of your strictly defined role to help a project succeed. Outline the Situation, Action, and Result.'
    }
};
