export const topicContent = {
    // ────────────── DSA TOPICS (PATTERN-FIRST & EXTERNAL LINKS) ──────────────
    'arrays': {
        title: 'Arrays & Hashing',
        patternSnapshot: 'Use a Hash Map or Set for O(1) lookups to track seen elements or count frequencies, avoiding nested loops.',
        whyPattern: [
            'Interviewers look for your ability to trade space for time (O(n) memory to achieve O(n) speed).',
            'Fundamental for deduplication and building frequency maps.'
        ],
        typicalVariations: [
            'Two Sum variants: Find pairs that sum to a target.',
            'Frequency Counting: Determine anagrams or majority elements.'
        ],
        commonMistakes: [
            'Using an array/list to track "seen" items resulting in O(n) lookups inside an O(n) loop.',
            'Forgetting to handle edge cases like empty arrays or all-duplicate inputs.',
            'Mutating the input array when it causes unexpected side effects.'
        ],
        externalProblems: [
            { name: 'Contains Duplicate', difficulty: 'Easy', note: 'Core HashSet pattern.', url: 'https://leetcode.com/problems/contains-duplicate/' },
            { name: 'Valid Anagram', difficulty: 'Easy', note: 'Core HashMap frequency counting.', url: 'https://leetcode.com/problems/valid-anagram/' },
            { name: 'Group Anagrams', difficulty: 'Medium', note: 'Using sorted strings or char counts as Hash keys.', url: 'https://leetcode.com/problems/group-anagrams/' }
        ],
        rapidPrompts: [
            'When is it appropriate to trade O(n) space for O(n) time using a Hash Map?',
            'Name 2 edge cases when doing array frequency counting.',
            'What is the worst-case lookup time for a Hash Table and why?'
        ],
        related: ['Two Pointers', 'Sliding Window']
    },
    'two-pointers': {
        title: 'Two Pointers',
        patternSnapshot: 'Optimize sequential iterations using two variables pointing to indices, often moving towards each other.',
        whyPattern: [
            'Proves you can optimize O(n^2) nested loops into O(n) single passes.',
            'Key invariant: The array must usually be sorted, or you are comparing ends (palindromes).'
        ],
        typicalVariations: [
            'Collision: Pointers start at opposite ends and meet in the middle.',
            'Fast/Slow: Pointers move in the same direction at different speeds.'
        ],
        commonMistakes: [
            'Applying opposing Two Pointers to an unsorted array without sorting first.',
            'Off-by-one errors resulting in infinite loops (e.g., using < instead of <= without care).',
            'Failing to skip duplicate values when asked for unique pairs (like in 3Sum).'
        ],
        externalProblems: [
            { name: 'Valid Palindrome', difficulty: 'Easy', note: 'Classic start/end collision pointer check.', url: 'https://leetcode.com/problems/valid-palindrome/' },
            { name: 'Two Sum II - Input Sorted', difficulty: 'Medium', note: 'Using pointers instead of HashMaps for sorted data.', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
            { name: '3Sum', difficulty: 'Medium', note: 'Fix one element, use Two Pointers on the rest.', url: 'https://leetcode.com/problems/3sum/' }
        ],
        rapidPrompts: [
            'What must be true about the array for the classic Start/End Two Pointers sum technique to work?',
            'What happens to Time/Space complexity if an unsorted array forces you to sort it first?',
            'How do Fast/Slow pointers detect cycles?'
        ],
        related: ['Arrays & Hashing', 'Linked Lists']
    },
    'sliding-window': {
        title: 'Sliding Window',
        patternSnapshot: 'Maintain a dynamic subset of elements using Left and Right pointers to satisfy a constraint.',
        whyPattern: [
            'Demonstrates ability to maintain running state (sums, counts) without recalculating from scratch.',
            'Turns O(n*k) substring problems into strictly O(n) traversals.'
        ],
        typicalVariations: [
            'Fixed Window: The window size never changes, you just slide it.',
            'Dynamic Window: The window expands until invalid, then shrinks until valid again.'
        ],
        commonMistakes: [
            'Updating the "best result" inside the shrinking loop instead of outside, missing edge targets.',
            'Failing to decrement the outgoing element\'s state when dragging the Left pointer forward.',
            'Handling variable window sizes with fixed window logic.'
        ],
        externalProblems: [
            { name: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', note: 'Simplest variation of dragging a min-pointer.', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
            { name: 'Longest Substring Without Repeating', difficulty: 'Medium', note: 'Dynamic window using a Set for uniqueness.', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
            { name: 'Minimum Window Substring', difficulty: 'Hard', note: 'Complex dynamic window with hash map character validation.', url: 'https://leetcode.com/problems/minimum-window-substring/' }
        ],
        rapidPrompts: [
            'What distinguishes a Sliding Window from a standard Two Pointer approach?',
            'How do you track the "state" characters inside your window efficiently?',
            'Name 2 edge cases that could break a dynamic Sliding Window implementation.'
        ],
        related: ['Two Pointers', 'Arrays & Hashing']
    },
    'stacks': {
        title: 'Stacks & Queues',
        patternSnapshot: 'Use Stacks (LIFO) to evaluate nested scopes or Monotonic Stacks to find "Next Greater" elements.',
        whyPattern: [
            'Shows an understanding of tracking state history where the most recent event dictates the next action.',
            'Monotonic stacks are the optimal way to solve "next greater/smaller element" queries in O(n).'
        ],
        typicalVariations: [
            'Matching Pairs: Validating parentheses or brackets.',
            'Monotonic Decreasing: Finding the next greater element in an array.'
        ],
        commonMistakes: [
            'Popping from an empty stack leading to undefined/null pointer errors.',
            'In JavaScript, using array `.shift()` for a Queue, causing O(n) re-indexing (use two arrays or a linked list).',
            'Storing values instead of indices in a Monotonic Stack, losing original positions.'
        ],
        externalProblems: [
            { name: 'Valid Parentheses', difficulty: 'Easy', note: 'Core matching pairs stack pattern.', url: 'https://leetcode.com/problems/valid-parentheses/' },
            { name: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', note: 'Mathematical scope evaluation.', url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/' },
            { name: 'Daily Temperatures', difficulty: 'Medium', note: 'Classic Monotonic Stack application.', url: 'https://leetcode.com/problems/daily-temperatures/' }
        ],
        rapidPrompts: [
            'Why does searching a standard Stack take O(n) time?',
            'What is the core invariant behind a Monotonic Stack?',
            'How would you implement a functional Queue in UI code without O(n) array `.shift()`?'
        ],
        related: ['Linked Lists', 'Graphs (BFS / DFS)']
    },
    'binary-search': {
        title: 'Binary Search',
        patternSnapshot: 'Halve the search space sequentially. Precondition: the dataset or answer space must be monotonic (sorted).',
        whyPattern: [
            'Proves you can optimize O(n) linear scans down to O(log n).',
            'Interviewers test if you know how to search an "answer space" rather than just an array.'
        ],
        typicalVariations: [
            'Standard target find: Locating an exact number in a sorted array.',
            'Search over an Answer Space: Guessing a capacity and verifying if it works via a greedy helper.'
        ],
        commonMistakes: [
            'Using `(left + right) / 2` causing integer overflow in typed languages.',
            'Infinite loops because `left` and `right` do not cross correctly.',
            'Incorrect loop conditions (`<` vs `<=`) or mid-pointer updates (`left = mid` instead of `mid + 1`).'
        ],
        externalProblems: [
            { name: 'Binary Search', difficulty: 'Easy', note: 'The fundamental standard algorithm.', url: 'https://leetcode.com/problems/binary-search/' },
            { name: 'Search a 2D Matrix', difficulty: 'Medium', note: 'Applying 1D binary search index formulas to a 2D grid.', url: 'https://leetcode.com/problems/search-a-2d-matrix/' },
            { name: 'Koko Eating Bananas', difficulty: 'Medium', note: 'Searching over an implicit answer space.', url: 'https://leetcode.com/problems/koko-eating-bananas/' }
        ],
        rapidPrompts: [
            'What is the formula to calculate `mid` safely without integer overflow?',
            'When would you use `left < right` instead of `left <= right` in a loop condition?',
            'What is the Time Complexity of searching over an Answer Space spanning 1 to K, where verification takes O(n)?'
        ],
        related: ['Trees & BSTs']
    },
    'linked-lists': {
        title: 'Linked Lists',
        patternSnapshot: 'Manipulate pointers carefully. Use a Dummy Node for changing heads. Use Fast/Slow pointers to find cycles.',
        whyPattern: [
            'Tests raw pointer manipulation and memory management awareness.',
            'Evaluates if you understand traversing without having random access O(1) indices.'
        ],
        typicalVariations: [
            'Reversal: Reversing links in-place.',
            'Fast/Slow (Tortoise & Hare): Finding a middle or detecting cyclic loops.'
        ],
        commonMistakes: [
            'Losing the reference to `curr.next` before adjusting pointers, breaking the chain.',
            'Null Pointer Exceptions from not checking if `head` or `head.next` is null.',
            'Not returning the correct head after a reversal (returning `curr` instead of `prev`).'
        ],
        externalProblems: [
            { name: 'Reverse Linked List', difficulty: 'Easy', note: 'Fundamental pointer manipulation loop.', url: 'https://leetcode.com/problems/reverse-linked-list/' },
            { name: 'Merge Two Sorted Lists', difficulty: 'Easy', note: 'Dummy node usage and pointer sewing.', url: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
            { name: 'Linked List Cycle', difficulty: 'Easy', note: 'Fast & Slow pointer cycle detection.', url: 'https://leetcode.com/problems/linked-list-cycle/' }
        ],
        rapidPrompts: [
            'What is the purpose of a Dummy Node?',
            'Explain Floyd\'s Tortoise and Hare cycle detection complexity.',
            'Name 2 edge cases when removing an Nth node from a Linked List.'
        ],
        related: ['Two Pointers']
    },
    'trees': {
        title: 'Trees & BSTs',
        patternSnapshot: 'Recursion is king. Nearly every tree problem requires traversing and passing a computed state up/down.',
        whyPattern: [
            'Shows mastery of Recursion and Call Stack evaluation.',
            'Tests knowledge of Depth-First vs Breadth-First invariants depending on state requirements.'
        ],
        typicalVariations: [
            'DFS (Pre/In/Post Order): Traversing all the way down branches first. Usually O(h) space.',
            'BFS (Level Order): Exploring neighbor levels using a Queue. O(w) space.'
        ],
        commonMistakes: [
            'Forgetting the base case (`if (!node) return 0`) leading to infinite recursion.',
            'Assuming a Binary Tree is inherently a Binary Search Tree (BST).',
            'Over-complicating state by using global variables instead of passing parameters up the call stack.'
        ],
        externalProblems: [
            { name: 'Maximum Depth of Binary Tree', difficulty: 'Easy', note: 'Standard DFS baseline.', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
            { name: 'Lowest Common Ancestor of a BST', difficulty: 'Medium', note: 'Utilizing BST properties to optimize traversal.', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/' },
            { name: 'Binary Tree Level Order Traversal', difficulty: 'Medium', note: 'Core BFS queue loop.', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' }
        ],
        rapidPrompts: [
            'What are the three main types of DFS traversal on a Tree?',
            'What guarantees does a Binary Search Tree (BST) provide?',
            'How is tree height space complexity related to best/worst case scenarios?'
        ],
        related: ['Graphs (BFS / DFS)', 'Binary Search']
    },
    'graphs': {
        title: 'Graphs (BFS / DFS)',
        patternSnapshot: 'Graphs model entities. BFS guarantees shortest path on unweighted edges. DFS explores branches fully. ALWAYS track visited states.',
        whyPattern: [
            'Shows you can model real-world relationships (networks, dependencies).',
            'Tests your ability to prevent infinite loops in cyclic data structures.'
        ],
        typicalVariations: [
            'Matrix as a Graph: Traversing islands or grids using adjacent cell coordinates.',
            'Adjacency List: Standard graph traversal tracking visited nodes.'
        ],
        commonMistakes: [
            'Forgetting the `visited` set leading to infinite recursion/loops.',
            'Marking a node visited AFTER popping it from a BFS queue instead of BEFORE pushing it, leading to duplicate pushed entries.',
            'Failing to account for disconnected graph components.'
        ],
        externalProblems: [
            { name: 'Number of Islands', difficulty: 'Medium', note: 'Classic grid traversal treating 1s as a connected graph.', url: 'https://leetcode.com/problems/number-of-islands/' },
            { name: 'Clone Graph', difficulty: 'Medium', note: 'Deep copy node creation tracked with a Hash Map.', url: 'https://leetcode.com/problems/clone-graph/' },
            { name: 'Course Schedule', difficulty: 'Medium', note: 'Topological sort / Cycle detection in a Directed Graph.', url: 'https://leetcode.com/problems/course-schedule/' }
        ],
        rapidPrompts: [
            'When must you use BFS instead of DFS on an unweighted graph?',
            'What is Topological Sort used for in DAGs?',
            'What is the time complexity of BFS using an Adjacency List?'
        ],
        related: ['Trees & BSTs']
    },
    'dp': {
        title: 'Dynamic Programming',
        patternSnapshot: 'Cache duplicate recursive calls. Identify State Variables and the State Transition Equation.',
        whyPattern: [
            'Proves you can optimize exponential O(2^n) brute force trees to polynomial time.',
            'Demonstrates high mathematical and logical deductive reasoning.'
        ],
        typicalVariations: [
            'Top-Down (Memoization): Recursion + HashMap cache. Easier to write naturally.',
            'Bottom-Up (Tabulation): Iterative array building. Easier to space-optimize.'
        ],
        commonMistakes: [
            'Failing to initialize base cases properly (e.g. out of bounds array accesses).',
            'Allocating a massive N x M matrix when checking the state transition proves you only need the previous row (Space Optimization).',
            'Over-complicating DP when a Greedy approach works.'
        ],
        externalProblems: [
            { name: 'Climbing Stairs', difficulty: 'Easy', note: '1D DP, essentially Fibonacci sequence.', url: 'https://leetcode.com/problems/climbing-stairs/' },
            { name: 'House Robber', difficulty: 'Medium', note: '1D DP with state decisions (include vs skip).', url: 'https://leetcode.com/problems/house-robber/' },
            { name: 'Longest Common Subsequence', difficulty: 'Medium', note: 'Classic 2D String tabulation.', url: 'https://leetcode.com/problems/longest-common-subsequence/' }
        ],
        rapidPrompts: [
            'What are the two core prerequisites for a problem to be solvable with DP?',
            'Compare Top-Down Memoization vs Bottom-Up Tabulation tradeoffs.',
            'How can you often optimize O(n) space in 1D DP down to O(1) space?'
        ],
        related: ['Trees & BSTs']
    },

    // ────────────── SYSTEMS AND BEHAVIORAL (THEORY-DRIVEN) ──────────────
    'scaling': {
        title: 'Scaling Fundamentals',
        theory: `Scaling expands capacity. Vertical scaling (up) adds machine power (CPU/RAM). Horizontal scaling (out) adds more machines. Horizontal is standard for modern architectures for resilience, though it requires a stateless app design.`,
        keyBullets: [
            'Vertical scaling has a hard hardware limit and creates single points of failure.',
            'Horizontal scaling provides redundancy but introduces data consistency challenges.',
            'Statelessness (e.g. JWTs instead of session state) is required for easy horizontal scaling.'
        ],
        complexity: { time: 'N/A', space: 'N/A' },
        questions: ['What are the limits of vertical scaling?', 'What challenges arise when you horizontally scale a stateful application?'],
        task: 'Draw a diagram showing a single-server setup migrating to a horizontally scaled setup behind a load balancer.',
        pitfalls: ['Scaling the web servers while leaving the database unscaled (shifting the bottleneck).'],
        related: ['Load Balancing', 'Databases']
    },
    'load-balancing': {
        title: 'Load Balancing',
        theory: `Load balancers distribute incoming traffic across multiple servers to prevent overload and handle failures. They operate at Layer 4 (Transport/IP) or Layer 7 (Application/HTTP).`,
        keyBullets: [
            'Routing algorithms: Round Robin, Least Connections, IP Hash.',
            'Layer 7 balancing can route based on URL paths or HTTP headers.',
            'Health checks ensure traffic is only sent to live, functioning instances.'
        ],
        complexity: { time: 'N/A', space: 'N/A' },
        questions: ['What is the difference between a Layer 4 and Layer 7 load balancer?', 'What is "session affinity" or sticky sessions?'],
        task: 'List 3 popular routing algorithms and briefly describe when to use them.',
        pitfalls: ['Making the load balancer itself a single point of failure (requires active-passive redundant LBs).'],
        related: ['Scaling Fundamentals', 'Caching']
    },
    'caching': {
        title: 'Caching Strategies',
        theory: `Caching stores copies of data in fast, temporary storage (RAM/Redis) to drastically reduce latency and backend database load on future requests.`,
        keyBullets: [
            'Cache-Aside: App asks cache, if miss, asks DB, saves to cache, returns.',
            'Write-Through: App writes to Cache, Cache synchronously writes to DB.',
            'Eviction policies determine what to delete when full: LRU, LFU.'
        ],
        complexity: { time: 'N/A', space: 'N/A' },
        questions: ['What is the difference between Cache-Aside and Write-Through caching?', 'What is a "cache stampede" and how might you prevent it?'],
        task: 'Design a pseudo-code wrapper that implements a Cache-Aside retrieve algorithm.',
        pitfalls: ['Caching data that changes too rapidly and requires constant invalidation.'],
        related: ['Databases', 'Load Balancing']
    },
    'databases': {
        title: 'SQL vs NoSQL',
        theory: `SQL (Relational) databases use strict schemas and guarantee ACID properties, great for complex relationships. NoSQL (Non-relational) databases prioritize scalability/availability using BASE semantics, perfect for unstructured data.`,
        keyBullets: [
            'SQL scales vertically easily, but sharding horizontally is traditionally complex.',
            'NoSQL types: Document (MongoDB), Key-Value (Redis), Wide-Column (Cassandra), Graph (Neo4j).',
            'Denormalization is heavily used in NoSQL to avoid costly joins.'
        ],
        complexity: { time: 'N/A', space: 'N/A' },
        questions: ['When would you strictly choose a Relational DB over NoSQL?', 'Explain the differences between Document and Key-Value stores.'],
        task: 'Define a schema for "Users and Posts". Once in 3rd Normal Form for SQL, once as a JSON document for NoSQL.',
        pitfalls: ['Applying heavy relational constraints and joins inside a NoSQL document database.'],
        related: ['Scaling Fundamentals', 'Caching']
    },
    'api-design': {
        title: 'API Design',
        theory: `APIs define system communication boundaries. REST is the standard architectural style using HTTP semantics. Modern alternatives include GraphQL (flexible, single-endpoint querying) and gRPC (high performance, binary protocol).`,
        keyBullets: [
            'REST uses standard HTTP methods: GET, POST, PUT, PATCH, DELETE.',
            'URLs should represent nouns (resources), not action verbs.',
            'Pagination, Filtering, and Versioning are required for scalable APIs.'
        ],
        complexity: { time: 'N/A', space: 'N/A' },
        questions: ['What constraints make an API TRULY RESTful?', 'What are the trade-offs of using GraphQL vs REST?'],
        task: 'Design 5 REST endpoints (URLs + methods) required to manage "Books" in a library app.',
        pitfalls: ['Using verbs in URLs (`/getBooks` instead of `GET /books`).'],
        related: ['Scaling Fundamentals', 'Load Balancing']
    },
    'star': {
        title: 'STAR Method Practice',
        theory: `STAR (Situation, Task, Action, Result) structures behavioral responses. It keeps anecdotes concise, focuses on your specific contributions, and ensures you highlight the impact and learnings.`,
        keyBullets: [
            'Situation: Set the context briefly.',
            'Task: What was the goal or problem?',
            'Action: What did YOU do specifically? Use "I" not "We".',
            'Result: Quantify the outcome (metrics, revenue, latency saved).'
        ],
        complexity: { time: 'N/A', space: 'N/A' },
        questions: ['Tell me about a time you failed.', 'Describe a situation where you worked under a tight deadline.'],
        task: 'Draft one complete STAR story for a technical project keeping it under 2 minutes when spoken.',
        pitfalls: ['Spending 80% of the time on the Situation, and rushing the Action/Result.'],
        related: ['Teamwork Stories', 'Leadership Examples']
    },
    'teamwork': {
        title: 'Teamwork Stories',
        theory: `Teamwork questions gauge your collaboration, empathy, and ability to elevate peers. Strong responses showcase communication, psychological safety, and unblocking teammates.`,
        keyBullets: [
            'Highlight mentorship, code reviews, and cross-functional communication.',
            'Avoid throwing teammates under the bus when discussing friction.',
            'Discuss shared successes and how you compromise on technical disagreements.'
        ],
        complexity: { time: 'N/A', space: 'N/A' },
        questions: ['Tell me about a time you disagreed with a team member.', 'Have you ever worked with a difficult colleague? How did you handle it?'],
        task: 'List 3 scenarios where you collaborated with others to solve a tough engineering problem.',
        pitfalls: ['Sounding arrogant or claiming sole credit for team achievements.'],
        related: ['Conflict Resolution', 'STAR Method Practice']
    },
    'conflict': {
        title: 'Conflict Resolution',
        theory: `These stories prove your emotional intelligence. Conflict is inevitable; interviewers want to see that you approach disagreements logically, openly, and professionally rather than emotionally.`,
        keyBullets: [
            'Focus on resolving the issue, not winning the argument.',
            'Use data and customer needs as the ultimate tie-breaker in technical conflicts.',
            'Acknowledge the other party\'s valid points.'
        ],
        complexity: { time: 'N/A', space: 'N/A' },
        questions: ['Tell me about a time you strongly disagreed with your manager.', 'How do you handle pushback on a design you proposed?'],
        task: 'Script a polite, constructive response to a senior engineer abruptly rejecting your PR.',
        pitfalls: ['Pretending you have never experienced conflict.'],
        related: ['Teamwork Stories', 'Leadership Examples']
    },
    'leadership': {
        title: 'Leadership Examples',
        theory: `Leadership is demonstrated through ownership and initiative, not titles. It means tackling ambiguous problems, proposing process improvements, or guiding a project to completion autonomously.`,
        keyBullets: [
            'Examples: Leading a refactor, improving CI/CD, onboarding a junior dev.',
            'Focus on "leading through influence" when you don’t have formal authority.',
            'Demonstrate the ability to balance your own tickets while helping the larger team.'
        ],
        complexity: { time: 'N/A', space: 'N/A' },
        questions: ['Tell me about a time you took the lead on a project.', 'Describe a time you fixed a problem without being asked.'],
        task: 'Identify a time you stepped out of your defined role to ensure project success. Outline the STAR.',
        pitfalls: ['Confusing leadership with bossing people around.'],
        related: ['STAR Method Practice', 'Teamwork Stories']
    }
};
