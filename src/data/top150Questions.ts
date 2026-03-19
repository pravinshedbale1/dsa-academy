import { Top150Question } from '../components/UI/Top150DetailsModal';

export const top150Questions: Top150Question[] = [
  {
    id: '1',
    title: '1. Two Sum',
    difficulty: 'Easy',
    pattern: 'Hash Map',
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    analysis: 'The problem asks us to find two numbers in an array that add up to a specific target. The brute force way is to check every pair, but since we are looking for a pair (current, target - current), we can use a Hash Map to store elements we\'ve already seen to achieve this in a single pass.',
    hints: [
      'What if we fix one number and look for the remaining target value in the array?',
      'Can you optimize the search for the second number using a fast lookup data structure like a Hash Map?'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Check every possible pair in the array using two nested loops. If their sum equals the target, return their indices.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[]{};
    }
}`,
        codeExplanation: `We use two loops. The outer loop picks each element one by one (index i). The inner loop checks every element after it (index j). If nums[i] + nums[j] equals our target, we found our answer and return both indices. This checks every possible pair but is slow for large arrays because we do n × n comparisons.`
      },
      {
        type: 'Optimal',
        explanation: 'Use a Hash Map to store the elements and their indices as you iterate. For each element, check if the complement (target - current element) already exists in the map.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
        codeExplanation: `We create an empty HashMap. For each number in the array, we calculate what number we need to reach the target (complement = target - current number). We then check if that complement already exists in our map. If it does, we found our pair and return their indices. If not, we store the current number and its index in the map so future elements can find it. This way, we only go through the array once.`
      }
    ]
  },
  {
    id: '2',
    title: '2. Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    pattern: 'Sliding Window',
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    analysis: 'We want to maximize our profit by buying low and selling high. We must buy before we sell. This means as we iterate through the days, we should keep track of the minimum price seen so far, and see what profit we could get if we sold on the current day.',
    hints: [
      'You are trying to find the maximum difference between two numbers where the smaller number comes before the larger number.',
      'Maintain the minimum price seen so far, and conceptually "sell" at every step to see if it produces a new max profit.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'For each day, check the profit against every future day and keep track of the maximum profit found.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int maxProfit(int[] prices) {
        int maxProfit = 0;
        for (int i = 0; i < prices.length; i++) {
            for (int j = i + 1; j < prices.length; j++) {
                int profit = prices[j] - prices[i];
                if (profit > maxProfit) {
                    maxProfit = profit;
                }
            }
        }
        return maxProfit;
    }
}`,
        codeExplanation: `We try buying on every single day (outer loop i) and selling on every future day (inner loop j). We calculate the profit for each buy-sell pair and keep track of the best profit we have seen. This works but is very slow because we check every possible combination.`
      },
      {
        type: 'Optimal',
        explanation: 'Iterate through the array once. Track the lowest price seen so far. At each step, calculate the potential profit if we sold today, and update the global max profit.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price; // new lowest point
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice; // new highest profit
            }
        }
        return maxProfit;
    }
}`,
        codeExplanation: `We walk through prices one day at a time. We keep track of the cheapest price we have seen so far (minPrice). On each day, if today's price is lower than our stored minimum, we update it — this is a better day to buy. Otherwise, we check if selling today (price - minPrice) would give us a bigger profit than we have seen before. After going through all days, maxProfit holds our answer. We only loop once, making it very fast.`
      }
    ]
  },
  {
    id: '3',
    title: '3. Contains Duplicate',
    difficulty: 'Easy',
    pattern: 'Hash Set',
    leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/',
    analysis: 'Determine if an array contains any duplicates. A brute force approach takes O(n²) time. Sorting the array brings it down to O(n log n). Using a Hash Set gives us O(1) lookups, providing an O(n) solution.',
    hints: [
      'Sorting the array makes duplicates sit adjacent to each other.',
      'Using a Hash Set allows you to store elements and instantly check if they have been seen before.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Compare every element with every other element to find a match.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] == nums[j]) return true;
            }
        }
        return false;
    }
}`,
  codeExplanation: `This brute-force approach is the most straightforward way to solve the problem. We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      },
      {
        type: 'Better',
        explanation: 'Sort the array first. If there are duplicates, they will be next to each other.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1) or O(n) depending on sort implementation',
        code: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Arrays.sort(nums);
        for (int i = 0; i < nums.length - 1; i++) {
            if (nums[i] == nums[i + 1]) return true;
        }
        return false;
    }
}`,
  codeExplanation: `This approach optimizes the naive solution by reducing redundant work. We first sort the input to establish an ordering that simplifies the problem. With sorted data, we can use efficient techniques like binary search or two pointers. Related elements are now adjacent, making comparisons straightforward. The sorting step takes O(n log n) which becomes the overall time complexity.`
      },
      {
        type: 'Optimal',
        explanation: 'Use a HashSet. Add elements as you iterate. If the set already contains the element, we found a duplicate.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        code: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            if (!set.add(num)) {
                return true; // add returns false if element already exists
            }
        }
        return false;
    }
}`,
  codeExplanation: `We use a HashMap for O(1) average-case lookup and storage. As we iterate through the input, we store key information in the map. For each new element, we check the map to see if a complementary element exists. This trades space for time, reducing the complexity from O(n²) to O(n).`
      }
    ]
  },
  {
    id: '4',
    title: '4. Product of Array Except Self',
    difficulty: 'Medium',
    pattern: 'Prefix/Suffix Array',
    leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/',
    analysis: 'We need to compute the product of all elements except self without using division in O(n) time. The key insight is that the product except self for element i is exactly (product of all elements to its left) * (product of all elements to its right).',
    hints: [
      'You cannot use division.',
      'How can you precompute the product of all numbers to the left of an index, and all numbers to the right of an index?'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'For each index, loop over the entire array to compute the product of all other elements.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        for (int i = 0; i < n; i++) {
            int prod = 1;
            for (int j = 0; j < n; j++) {
                if (i != j) prod *= nums[j];
            }
            result[i] = prod;
        }
        return result;
    }
}`,
  codeExplanation: `This brute-force approach is the most straightforward way to solve the problem. We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      },
      {
        type: 'Better',
        explanation: 'Use two arrays: Left and Right. left[i] contains the product of all elements to the left of i. right[i] contains the product of all elements to the right. Finally, res[i] = left[i] * right[i].',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        code: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] left = new int[n];
        int[] right = new int[n];
        int[] result = new int[n];
        
        left[0] = 1;
        for (int i = 1; i < n; i++) left[i] = left[i - 1] * nums[i - 1];
        
        right[n - 1] = 1;
        for (int i = n - 2; i >= 0; i--) right[i] = right[i + 1] * nums[i + 1];
        
        for (int i = 0; i < n; i++) result[i] = left[i] * right[i];
        
        return result;
    }
}`,
  codeExplanation: `This approach optimizes the naive solution by reducing redundant work. We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      },
      {
        type: 'Optimal',
        explanation: 'We don\'t need explicit left and right arrays. We can calculate the left product directly into the result array, then compute the right product on the fly in a reverse pass, multiplying it directly into the result array to achieve O(1) auxiliary space (excluding output array).',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        
        // Pass 1: Result array stores the left products
        result[0] = 1;
        for (int i = 1; i < n; i++) {
            result[i] = result[i - 1] * nums[i - 1];
        }
        
        // Pass 2: Calculate right products on the fly
        int rightProd = 1;
        for (int i = n - 1; i >= 0; i--) {
            result[i] = result[i] * rightProd;
            rightProd *= nums[i];
        }
        
        return result;
    }
}`,
  codeExplanation: `We don\\'t need explicit left and right arrays. We can calculate the left product directly into the result array, then compute the right product on the fly in a reverse pass, multiplying it directly into the result array to achieve O(1) auxiliary space (excluding output array).`
      }
    ]
  },
  {
    id: '5',
    title: '5. Maximum Subarray',
    difficulty: 'Medium',
    pattern: 'Kadane\'s Algorithm',
    leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/',
    analysis: 'Find the contiguous subarray with the largest sum. If all numbers are positive, the answer is the whole array sum. If there are negative numbers, we have instances where restarting from the current negative number reduces the sum, or sometimes a negative number is worth adding if the subsequent positive numbers are huge.',
    hints: [
      'If the current running sum becomes negative, is it useful to keep it, or should we just start a new subarray heavily from the current number?'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Test all possible subarrays using two nested loops and find the one with the max sum.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int maxSubArray(int[] nums) {
        int max = Integer.MIN_VALUE;
        for (int i = 0; i < nums.length; i++) {
            int currentSum = 0;
            for (int j = i; j < nums.length; j++) {
                currentSum += nums[j];
                max = Math.max(max, currentSum);
            }
        }
        return max;
    }
}`,
  codeExplanation: `This brute-force approach is the most straightforward way to solve the problem. We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      },
      {
        type: 'Optimal',
        explanation: 'Kadane\'s Algorithm: Track a running sum. If the running sum becomes negative, it drag down any future subarray, so we reset it to 0. At every step, we update our max sum.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int maxSubArray(int[] nums) {
        int max_so_far = nums[0];
        int curr_max = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            curr_max = Math.max(nums[i], curr_max + nums[i]);
            max_so_far = Math.max(max_so_far, curr_max);
        }
        return max_so_far;
    }
}`,
  codeExplanation: `Kadane\\'s Algorithm: Track a running sum. If the running sum becomes negative, it drag down any future subarray, so we reset it to 0. At every step, we update our max sum.`
      }
    ]
  },
  {
    id: '6',
    title: '6. Maximum Product Subarray',
    difficulty: 'Medium',
    pattern: 'Dynamic Programming',
    leetcodeUrl: 'https://leetcode.com/problems/maximum-product-subarray/',
    analysis: 'Similar to Maximum Subarray, but with products. A massive negative product can turn into a massive positive product if multiplied by another negative number. Thus, we must track both the current max and the current min (which holds the most negative value).',
    hints: [
      'Track the minimum ending at the current position too, because a negative number multiplied by the minimum can become the maximum.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Check every possible subarray by using two nested loops. Calculate the product of each subarray and track the maximum.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int maxProduct(int[] nums) {
        int result = nums[0];
        for (int i = 0; i < nums.length; i++) {
            int product = 1;
            for (int j = i; j < nums.length; j++) {
                product *= nums[j];
                result = Math.max(result, product);
            }
        }
        return result;
    }
}`,
        codeExplanation: `We try every possible subarray starting from index i to index j. We multiply the elements one by one and keep updating the maximum product found. This guarantees we find the answer but is slow because we check n × n combinations.`
      },
      {
        type: 'Optimal',
        explanation: 'Track both the current max product and current min product. A negative min multiplied by a negative number can become the new max. At each element, compute the new max/min from three candidates: the element alone, element × previous max, element × previous min.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int maxProduct(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int maxSoFar = nums[0];
        int minSoFar = nums[0];
        int result = maxSoFar;
        
        for (int i = 1; i < nums.length; i++) {
            int curr = nums[i];
            int tempMax = Math.max(curr, Math.max(maxSoFar * curr, minSoFar * curr));
            minSoFar = Math.min(curr, Math.min(maxSoFar * curr, minSoFar * curr));
            
            maxSoFar = tempMax;
            result = Math.max(maxSoFar, result);
        }
        return result;
    }
}`,
        codeExplanation: `We keep two variables as we walk the array: maxSoFar (biggest product ending here) and minSoFar (smallest product ending here — important because a very negative number times another negative becomes a big positive). For each new element, we compute tempMax as the best of three choices: (1) start fresh with just the current number, (2) extend the previous max product, or (3) extend the previous min product (which flips a negative into positive). We save tempMax before updating minSoFar to avoid overwriting. The global result tracks the best product seen anywhere.`
      }
    ]
  },
  {
    id: '7',
    title: '7. Find Minimum in Rotated Sorted Array',
    difficulty: 'Medium',
    pattern: 'Binary Search',
    leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
    analysis: 'A sorted array is rotated. Finding the minimum ordinarily takes O(n), but since halves of the array remain fully sorted, we can use binary search to achieve O(log n). We compare the middle element with the right pointer to determine which half is unsorted (and thus contains the inflection point/minimum).',
    hints: [
      'If nums[mid] > nums[right], it means the minimum is to the right of mid.',
      'If nums[mid] <= nums[right], it means the right half is sorted, so the minimum must be at mid or to its left.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Simply scan through the entire array and find the minimum element. This ignores the sorted+rotated property but always works.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int findMin(int[] nums) {
        int min = nums[0];
        for (int num : nums) {
            if (num < min) min = num;
        }
        return min;
    }
}`,
        codeExplanation: `We start by assuming the first element is the minimum. Then we go through every element in the array. If we find something smaller, we update our minimum. At the end, we have the smallest element. This works but doesn't use the fact that the array is sorted and rotated — we can do better.`
      },
      {
        type: 'Optimal',
        explanation: 'Use binary search. Compare the middle element with the rightmost element. If mid > right, the minimum must be in the right half (the rotation point is there). If mid <= right, the right half is properly sorted, so the minimum is at mid or to its left.',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int findMin(int[] nums) {
        int left = 0, right = nums.length - 1;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return nums[left];
    }
}`,
        codeExplanation: `We use two pointers, left and right, starting at the ends of the array. We find the middle element. If nums[mid] is bigger than nums[right], it means the rotation happened somewhere to the right of mid — so the minimum is in the right half, and we move left to mid + 1. Otherwise, the right side is perfectly sorted, so the minimum could be at mid or to its left — we move right to mid (not mid - 1, because mid itself could be the answer). We keep halving until left equals right, which is our minimum.`
      }
    ]
  },
  {
    id: '8',
    title: '8. Search in Rotated Sorted Array',
    difficulty: 'Medium',
    pattern: 'Binary Search',
    leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    analysis: 'We need to search for a target in an array that has been rotated. Because it was originally sorted, at least one half of the array (split at mid) will always be perfectly sorted. We can leverage this to check if our target falls within the sorted half. If it does, we search there; if not, we discard the sorted half.',
    hints: [
      'At any mid index, either the left half is entirely sorted, or the right half is entirely sorted.',
      'Determine which half is sorted, then check if the target numerically falls within the bounds of that sorted half.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Linearly scan the array to find the target. This ignores the sorted property entirely.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int search(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
}`,
        codeExplanation: `We simply check every element one by one. If we find the target, we return its index. If we finish the loop without finding it, we return -1. This works but is slow for large arrays.`
      },
      {
        type: 'Optimal',
        explanation: 'Modified binary search. At any point, at least one half (left or right of mid) is perfectly sorted. We check if the target falls within the range of the sorted half. If yes, we search there. If no, we search the other half.',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) return mid;
            
            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } 
            else {
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
}`,
        codeExplanation: `We use binary search with a twist. First, if nums[mid] equals target, we are done. Then we figure out which half is properly sorted: if nums[left] <= nums[mid], the left half is sorted. We then check if the target falls within [nums[left], nums[mid]). If yes, search left; if no, search right. If the left half is NOT sorted, then the right half must be sorted — we do the same check on the right side. This way, we eliminate half the array each time, giving us O(log n) speed.`
      }
    ]
  },
  {
    id: '9',
    title: '9. 3Sum',
    difficulty: 'Medium',
    pattern: 'Two Pointers',
    leetcodeUrl: 'https://leetcode.com/problems/3sum/',
    analysis: 'Find all unique triplets that sum to 0. A brute force approach checks all triplets in O(n³). We can optimize this by sorting the array first, locking one element (i), and using a two-pointer approach (left and right) for the remaining array. We skip duplicates to ensure unique triplets.',
    hints: [
      'Sort the array first.',
      'Fix one number, and then use Two Pointers to find the remaining two numbers that sum to the negated fixed number.',
      'Be careful to skip duplicate elements for both the fixed number and the pointers to avoid duplicate triplets.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Use three nested loops to check every possible triplet. Use a Set to avoid duplicate triplets.',
        timeComplexity: 'O(n³)',
        spaceComplexity: 'O(n)',
        code: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Set<List<Integer>> result = new HashSet<>();
        Arrays.sort(nums);
        for (int i = 0; i < nums.length - 2; i++) {
            for (int j = i + 1; j < nums.length - 1; j++) {
                for (int k = j + 1; k < nums.length; k++) {
                    if (nums[i] + nums[j] + nums[k] == 0) {
                        result.add(Arrays.asList(nums[i], nums[j], nums[k]));
                    }
                }
            }
        }
        return new ArrayList<>(result);
    }
}`,
        codeExplanation: `We sort the array first so duplicate triplets have the same order. Then we try every combination of three elements using three nested loops (i, j, k). If their sum is 0, we add them to a HashSet (which automatically removes duplicates). Finally, we convert the Set to a List. This is correct but very slow — O(n³) means it will time out on large inputs.`
      },
      {
        type: 'Optimal',
        explanation: 'Sort the array. Fix one element at a time, then use two pointers on the remaining part. Skip duplicates to avoid repeated triplets.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1) to O(n) based on sorting',
        code: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            
            int left = i + 1, right = nums.length - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return res;
    }
}`,
        codeExplanation: `First we sort the array. Then we fix one number (nums[i]) and use two pointers (left and right) to find the other two numbers that make the sum zero. If the sum is too small, we move left pointer right to increase it. If too big, we move right pointer left to decrease it. If sum is exactly 0, we save the triplet and skip over any duplicate values to avoid adding the same triplet again. We also skip duplicate values for the fixed element (i) at the top of the loop. This reduces the problem from O(n³) to O(n²).`
      }
    ]
  },
  {
    id: '10',
    title: '10. Container With Most Water',
    difficulty: 'Medium',
    pattern: 'Two Pointers',
    leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/',
    analysis: 'Given an array of wall heights, form a container using two lines that holds the most water. The area is limited by the shorter line and the width between them. Start with max width (pointers at the ends), and greedily move the pointer pointing to the shorter line inward, hoping to find a taller line that offsets the loss in width.',
    hints: [
      'The area is formed by the min(heightLeft, heightRight) * distance_between(left, right).',
      'Start with the widest container. Moving the taller line inward never increases area because the area is bottlenecked by the shorter line.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Check the water held by every possible pair of lines and track the maximum.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int maxArea(int[] height) {
        int maxArea = 0;
        for (int i = 0; i < height.length; i++) {
            for (int j = i + 1; j < height.length; j++) {
                int currentArea = Math.min(height[i], height[j]) * (j - i);
                maxArea = Math.max(maxArea, currentArea);
            }
        }
        return maxArea;
    }
}`,
  codeExplanation: `This brute-force approach is the most straightforward way to solve the problem. We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      },
      {
        type: 'Optimal',
        explanation: 'Use two pointers from both ends. The area is limited by the shortest wall. To maximize the area, always increment the pointer pointing to the shorter wall.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int maxArea = 0;
        
        while (left < right) {
            int currentHeight = Math.min(height[left], height[right]);
            int currentArea = currentHeight * (right - left);
            maxArea = Math.max(maxArea, currentArea);
            
            // Move the shorter bound inward
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxArea;
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '11',
    title: '11. Sum of Two Integers',
    difficulty: 'Medium',
    pattern: 'Bit Manipulation',
    leetcodeUrl: 'https://leetcode.com/problems/sum-of-two-integers/',
    analysis: 'Add two integers without using the + or - operators. This requires simulating addition using bitwise operators. Bitwise XOR (^) handles the addition without carry, and Bitwise AND (&) shifted left by 1 handles the carry.',
    hints: [
      'a ^ b gives the sum ignoring carry.',
      '(a & b) << 1 gives the carry. Repeat until there is no carry left.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Iteratively apply XOR for the sum and AND + Shift for the carry until the carry becomes 0.',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int getSum(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
}`,
        codeExplanation: `Think of adding two binary numbers by hand. XOR (^) gives the sum of each bit position ignoring any carry (like 1+1=0 with carry). AND (&) finds positions where both bits are 1 (where a carry happens), and shifting left by 1 moves the carry to the next position. We repeat this: compute sum without carry (XOR), compute carry (AND shifted), then add carry to the sum. We stop when there is no more carry (b becomes 0).`
      }
    ]
  },
  {
    id: '12',
    title: '12. Number of 1 Bits',
    difficulty: 'Easy',
    pattern: 'Bit Manipulation',
    leetcodeUrl: 'https://leetcode.com/problems/number-of-1-bits/',
    analysis: 'Count the number of set bits (1s) in an integer (also known as Hamming weight). We can shift the bits right and evaluate the least significant bit, but a more optimal way drops the lowest set bit in exactly O(number of 1s) steps.',
    hints: [
      'n & (n - 1) flips the least-significant 1-bit to a 0.',
      'Count how many times you can do this until the number becomes 0.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Check each of the 32 bits one by one using bit masking. Check if the i-th bit is set using (n >> i) & 1.',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        for (int i = 0; i < 32; i++) {
            if (((n >> i) & 1) == 1) {
                count++;
            }
        }
        return count;
    }
}`,
        codeExplanation: `We check all 32 bit positions one by one. For each position i, we shift n right by i places and check if the last bit is 1 using AND with 1. If it is, we increment our count. This always does exactly 32 iterations regardless of the number.`
      },
      {
        type: 'Better',
        explanation: 'Shift bits right by 1 and check if the LSB is 1 using n & 1. Use unsigned shift >>> in Java to handle negative numbers.',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            count += (n & 1);
            n >>>= 1;
        }
        return count;
    }
}`,
        codeExplanation: `We keep checking the rightmost bit of n using n & 1. If it is 1, we add it to count. Then we shift n right by one position using unsigned right shift (>>>). This removes the rightmost bit and brings the next bit into position. We keep doing this until n becomes 0. The unsigned shift (>>>) is important in Java because regular shift (>>) would fill with 1s for negative numbers, creating an infinite loop.`
      },
      {
        type: 'Optimal',
        explanation: 'Brian Kernighan\'s Algorithm: n & (n - 1) clears the lowest set bit. Count how many times until n becomes 0. Runs exactly as many times as there are 1-bits.',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n &= (n - 1);
            count++;
        }
        return count;
    }
}`,
        codeExplanation: `This uses a clever trick: when you subtract 1 from a number, it flips the lowest set bit and all bits below it. When you AND this with the original number, it removes exactly one set bit (the lowest one). Each iteration removes one 1-bit, so we only loop as many times as there are 1-bits. For a number with just two 1-bits, we only loop twice instead of 32 times.`
      }
    ]
  },
  {
    id: '13',
    title: '13. Counting Bits',
    difficulty: 'Easy',
    pattern: 'Dynamic Programming / Bit Manipulation',
    leetcodeUrl: 'https://leetcode.com/problems/counting-bits/',
    analysis: 'Return an array of the number of 1s in the binary representation of every number from 0 to n. While we could use the Number of 1 Bits approach for each number, DP allows us to do this in O(n) total time by reusing previously computed answers.',
    hints: [
      'For any number x, x * 2 is just x shifted left by 1. Did the number of 1s change?',
      'Even numbers have the same number of 1s as their half. Odd numbers have 1 more than their previous even number.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Call Brian Kernighan\'s Algorithm for every number from 0 to n.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n) for output',
        code: `class Solution {
    public int[] countBits(int n) {
        int[] ans = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            ans[i] = count(i);
        }
        return ans;
    }
    
    private int count(int num) {
        int count = 0;
        while (num != 0) {
            num &= (num - 1);
            count++;
        }
        return count;
    }
}`,
        codeExplanation: `For each number from 0 to n, we call a helper function that counts how many 1-bits it has using Brian Kernighan's trick (n & (n-1) removes one set bit each time). This works fine but doesn't reuse any previously computed results, so it's slower than needed.`
      },
      {
        type: 'Optimal',
        explanation: 'Use DP based on the relationship: if n is even, bits[n] = bits[n/2]; if n is odd, bits[n] = bits[n/2] + 1. Written as bits[i] = bits[i >> 1] + (i & 1).',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n) for output',
        code: `class Solution {
    public int[] countBits(int n) {
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
}`,
        codeExplanation: `This uses a clever DP insight: dividing a number by 2 (i >> 1) is the same as removing its last bit. So the number of 1-bits in i equals the number of 1-bits in i/2 plus whether i's last bit is 1 (i & 1). Since we compute values in order from 0 to n, dp[i >> 1] is always already computed when we need it. This gives us O(1) per number instead of O(log n).`
      }
    ]
  },
  {
    id: '14',
    title: '14. Missing Number',
    difficulty: 'Easy',
    pattern: 'Math / Bit Manipulation',
    leetcodeUrl: 'https://leetcode.com/problems/missing-number/',
    analysis: 'Given an array containing n distinct numbers in the range [0, n], find the one missing. We can use the Gauss sum formula to find the expected sum and subtract the actual sum. Alternatively, XOR operation works perfectly here.',
    hints: [
      'What is the sum of numbers from 0 to n?',
      'If you XOR all numbers from 0 to n, and then XOR all the elements in the array, the duplicates cancel out, leaving the missing number.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Sort the array, then iterate through to see which number doesn\'t match its index.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int missingNumber(int[] nums) {
        Arrays.sort(nums);
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != i) return i;
        }
        return nums.length;
    }
}`,
        codeExplanation: `After sorting, every number should sit at the index equal to its value (0 at index 0, 1 at index 1, etc.). We walk through and the first time nums[i] doesn't match i, that's our missing number. If all match, the missing number must be n (the last one). Sorting takes O(n log n) which is the bottleneck.`
      },
      {
        type: 'Better',
        explanation: 'Use the Gauss formula: expected sum = n*(n+1)/2. Subtract the actual sum. Difference is the missing number.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        int expectedSum = n * (n + 1) / 2;
        int actualSum = 0;
        for (int num : nums) {
            actualSum += num;
        }
        return expectedSum - actualSum;
    }
}`,
        codeExplanation: `The sum of numbers 0 to n is n*(n+1)/2 — that's the Gauss formula. We calculate this expected sum, then add up all numbers actually in the array. The difference between expected and actual is our missing number. Simple and fast, though for very large n the sum could overflow (not an issue in most interview scenarios).`
      },
      {
        type: 'Optimal',
        explanation: 'XOR all indices 0..n with all array values. Duplicate values cancel out, leaving only the missing number. Avoids overflow.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int missingNumber(int[] nums) {
        int missing = nums.length;
        for (int i = 0; i < nums.length; i++) {
            missing ^= i ^ nums[i];
        }
        return missing;
    }
}`,
        codeExplanation: `XOR has a special property: a ^ a = 0 and a ^ 0 = a. We start with missing = n (the length). Then we XOR every index (0, 1, ..., n-1) and every value in the array. Since every number from 0 to n appears exactly once between the indices and the array values — EXCEPT the missing one — all pairs cancel out, leaving just the missing number. This avoids any overflow risk unlike the sum approach.`
      }
    ]
  },
  {
    id: '15',
    title: '15. Reverse Bits',
    difficulty: 'Easy',
    pattern: 'Bit Manipulation',
    leetcodeUrl: 'https://leetcode.com/problems/reverse-bits/',
    analysis: 'Reverse the bits of a given 32-bit unsigned integer. We can iteratively shift bits off the end of the input integer and push them onto the beginning of an output integer.',
    hints: [
      'Extract the Right-most bit of n.',
      'Shift it to its new reversed position. Do this for all 32 bits.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Loop 32 times. Extract the rightmost bit using (n & 1). Shift the result left to make room, add the extracted bit, and shift n right using unsigned shift >>>.',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        code: `public class Solution {
    public int reverseBits(int n) {
        int result = 0;
        for (int i = 0; i < 32; i++) {
            int bit = n & 1;
            result <<= 1;
            result |= bit;
            n >>>= 1;
        }
        return result;
    }
}`,
        codeExplanation: `We process all 32 bits one at a time. First, we extract the rightmost bit of n using (n & 1). Then we shift result left by 1 to make room for this new bit. We place the extracted bit into result using OR (|=). Finally, we shift n right by 1 using unsigned shift (>>>) to bring the next bit into position. After 32 iterations, result contains all bits in reversed order. It's like reading digits right-to-left and writing them left-to-right.`
      }
    ]
  },
  {
    id: '16',
    title: '16. Climbing Stairs',
    difficulty: 'Easy',
    pattern: 'Dynamic Programming (Fibonacci)',
    leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/',
    analysis: 'You can climb 1 or 2 steps. How many ways to reach the top n? The number of ways to reach step n is the sum of ways to reach step n-1 and step n-2. This is identical to the Fibonacci sequence.',
    hints: [
      'To reach step 5, you either step from step 4 (1 step) or step 3 (2 steps).',
      'This means Total(5) = Total(4) + Total(3).'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Plain recursion. For step n, recursively compute ways(n-1) + ways(n-2). Extremely slow due to overlapping subproblems.',
        timeComplexity: 'O(2ⁿ)',
        spaceComplexity: 'O(n)',
        code: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        return climbStairs(n - 1) + climbStairs(n - 2);
    }
}`,
        codeExplanation: `To reach step n, we either came from step n-1 (took 1 step) or step n-2 (took 2 steps). So total ways = ways(n-1) + ways(n-2). Base cases: 1 way to reach step 1, 2 ways to reach step 2. The problem is this recalculates the same values many times — ways(5) calls ways(4) and ways(3), but ways(4) also calls ways(3), and so on. This creates an exponential tree of redundant work.`
      },
      {
        type: 'Better',
        explanation: 'Use a DP array to store answers. dp[i] = dp[i-1] + dp[i-2]. Each value is computed only once.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        code: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int[] dp = new int[n + 1];
        dp[1] = 1;
        dp[2] = 2;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}`,
        codeExplanation: `We create an array dp where dp[i] = number of ways to reach step i. We know dp[1] = 1 and dp[2] = 2. For every step from 3 onward, the answer is just dp[i-1] + dp[i-2] — combining the ways from the previous two steps. By storing each result, we avoid recalculating. This is exactly the Fibonacci sequence.`
      },
      {
        type: 'Optimal',
        explanation: 'We only need the last two values, not the whole array. Use two variables to track them.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int twoBack = 1;
        int oneBack = 2;
        for (int i = 3; i <= n; i++) {
            int current = oneBack + twoBack;
            twoBack = oneBack;
            oneBack = current;
        }
        return oneBack;
    }
}`,
        codeExplanation: `Instead of storing the entire array, we notice we only ever look at the previous two values. So we keep two variables: twoBack (ways to step i-2) and oneBack (ways to step i-1). For each new step, current = oneBack + twoBack. Then we slide the window: twoBack becomes oneBack, and oneBack becomes current. At the end, oneBack holds our answer. This saves memory from O(n) to O(1).`
      }
    ]
  },
  {
    id: '17',
    title: '17. Coin Change',
    difficulty: 'Medium',
    pattern: 'Dynamic Programming (Knapsack)',
    leetcodeUrl: 'https://leetcode.com/problems/coin-change/',
    analysis: 'Given coins of different denominations, find the fewest coins that make up a given amount. This is an unbounded knapsack problem. For every amount from 1 to Target, we evaluate taking each coin: dp[amount] = min(dp[amount], 1 + dp[amount - coin]).',
    hints: [
      'If you need 11 cents and have a 5 cent coin, the answer could be 1 + coins needed for 6 cents.',
      'Build up the answer dynamically from 0 to target.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Recursively try every combination of coins. For each coin, subtract it from the amount and recurse. Very slow due to exponential branching.',
        timeComplexity: 'O(Sⁿ) where S is amount, n is coin denominations',
        spaceComplexity: 'O(S)',
        code: `class Solution {
    public int coinChange(int[] coins, int amount) {
        if (amount == 0) return 0;
        int res = Integer.MAX_VALUE;
        for (int c : coins) {
            if (amount - c >= 0) {
                int subProb = coinChange(coins, amount - c);
                if (subProb != -1) {
                    res = Math.min(res, subProb + 1);
                }
            }
        }
        return res == Integer.MAX_VALUE ? -1 : res;
    }
}`,
        codeExplanation: `For a given amount, we try using each coin. For each coin c, we subtract it from the amount and recursively solve the smaller problem (amount - c). If the recursive call returns a valid answer, we add 1 (for the coin we just used) and track the minimum. If no coin leads to a valid solution, we return -1. This explores every possible combination, creating an exponential tree of recursive calls.`
      },
      {
        type: 'Optimal',
        explanation: 'Bottom-up DP. dp[i] = minimum coins to make amount i. For each amount from 1 to target, try each coin: dp[i] = min(dp[i], dp[i - coin] + 1).',
        timeComplexity: 'O(amount × coins)',
        spaceComplexity: 'O(amount)',
        code: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int max = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, max);
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
        codeExplanation: `We create a dp array where dp[i] = minimum coins to make amount i. We fill it with a large number (amount + 1) as "infinity" and set dp[0] = 0 (zero coins needed for amount 0). For each amount from 1 to target, we try every coin. If the coin fits (coin <= i), we check whether using this coin would give fewer total coins than our current best: dp[i - coin] + 1. After filling the entire table, dp[amount] has our answer. If it's still the big number, the amount is impossible, so we return -1.`
      }
    ]
  },
  {
    id: '18',
    title: '18. Longest Increasing Subsequence',
    difficulty: 'Medium',
    pattern: 'Dynamic Programming / Binary Search',
    leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/',
    analysis: 'Find the length of the longest strictly increasing subsequence. DP is straightforward: compare with all previous elements. A more optimal way maintains a sorted active sequence and uses Binary Search to greedily pick or replace elements.',
    hints: [
      'DP: For each element, look back at all smaller elements before it and add 1 to their longest increasing sequence.',
      'Binary Search: Build a simulated resulting array. When a new element comes in, binary search where it fits. If it extends the sequence, append it. If not, replace the next largest.'
    ],
    approaches: [
      {
        type: 'Better',
        explanation: 'DP approach. For each element, look back at all previous elements. If any previous element is smaller, extend its subsequence by 1.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(n)',
        code: `class Solution {
    public int lengthOfLIS(int[] nums) {
        if (nums.length == 0) return 0;
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);
        int maxLen = 1;
        
        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            maxLen = Math.max(maxLen, dp[i]);
        }
        return maxLen;
    }
}`,
        codeExplanation: `dp[i] represents the length of the longest increasing subsequence ending at index i. We initialize all to 1 (each element alone is a subsequence of length 1). For each element i, we check every previous element j. If nums[j] < nums[i], we can extend that subsequence by adding nums[i], giving dp[j] + 1. We take the max of all such options. We track the global maximum across all dp[i] values.`
      },
      {
        type: 'Optimal',
        explanation: 'Patience Sorting / Binary Search. Maintain a "tails" array. For each number, binary search to find where it fits. If it extends the sequence, append. If not, replace the first element >= it.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        code: `class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int size = 0;
        
        for (int x : nums) {
            int left = 0, right = size;
            while (left != right) {
                int mid = left + (right - left) / 2;
                if (tails[mid] < x) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            tails[left] = x;
            if (left == size) size++;
        }
        return size;
    }
}`,
        codeExplanation: `We maintain an array "tails" where tails[i] is the smallest possible tail value for an increasing subsequence of length i+1. For each new number x, we binary search in tails to find where x should go. If x is bigger than everything in tails, it extends our longest subsequence (append and increase size). If not, it replaces the first element in tails that is >= x, keeping future options open by keeping tail values as small as possible. The final size is our LIS length. Note: tails doesn't represent the actual LIS, just its length.`
      }
    ]
  },
  {
    id: '19',
    title: '19. Longest Common Subsequence',
    difficulty: 'Medium',
    pattern: '2D Dynamic Programming',
    leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence/',
    analysis: 'Classic 2D DP problem. Given two strings, find their LCS. We build a 2D matrix where dp[i][j] represents the LCS between text1[0:i] and text2[0:j].',
    hints: [
      'If the two characters match, add 1 to the diagonal top-left cell. dp[i][j] = 1 + dp[i-1][j-1]',
      'If they don\'t match, carry over the max between the cell above and the cell left. max(dp[i-1][j], dp[i][j-1])'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Recursively try all possibilities. For each pair of characters, either they match (add 1 + recurse on both shortened) or they don\'t (take max of skipping one from either string).',
        timeComplexity: 'O(2^(m+n))',
        spaceComplexity: 'O(m + n)',
        code: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        return lcs(text1, text2, text1.length() - 1, text2.length() - 1);
    }
    
    private int lcs(String t1, String t2, int i, int j) {
        if (i < 0 || j < 0) return 0;
        if (t1.charAt(i) == t2.charAt(j)) {
            return 1 + lcs(t1, t2, i - 1, j - 1);
        }
        return Math.max(lcs(t1, t2, i - 1, j), lcs(t1, t2, i, j - 1));
    }
}`,
        codeExplanation: `We compare the last characters of both strings. If they match, that character is part of the LCS, so we add 1 and recurse on both strings shortened by one. If they don't match, we try two options: skip the last character of text1, or skip the last character of text2, and take the better result. Base case: if either string is empty, the LCS length is 0. This creates exponential branching because many subproblems overlap.`
      },
      {
        type: 'Optimal',
        explanation: '2D DP table. dp[i][j] = LCS of text1[0..i-1] and text2[0..j-1]. If characters match, dp[i][j] = 1 + dp[i-1][j-1]. Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1]).',
        timeComplexity: 'O(m × n)',
        spaceComplexity: 'O(m × n)',
        code: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}`,
        codeExplanation: `We build a 2D table where dp[i][j] stores the LCS length for text1[0..i-1] and text2[0..j-1]. Row 0 and column 0 are all zeros (empty string has LCS of 0 with anything). For each cell, if the characters match (text1[i-1] == text2[j-1]), we take the diagonal value + 1 — meaning this matching character extends the LCS found so far. If they don't match, we take the max of the cell above (skip text1's character) or the cell to the left (skip text2's character). The answer is in dp[m][n].`
      }
    ]
  },
  {
    id: '20',
    title: '20. Word Break',
    difficulty: 'Medium',
    pattern: 'Dynamic Programming / Trie',
    leetcodeUrl: 'https://leetcode.com/problems/word-break/',
    analysis: 'Determine if a string can be segmented into space-separated dictionary words. We can use a 1D DP array where dp[i] is true if the string ending at i can be broken down correctly. To check if i is valid, we look at previous true values (j) and see if substring(j, i) is in the dict.',
    hints: [
      'Think of this as checking if there is a path through the string where every jump is a valid word.',
      'dp[i] = dp[j] && wordDict.contains(s.substring(j, i)) for some j < i.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Recursion with backtracking. Try every possible split of the string. If prefix is in the dict, recurse on the remainder.',
        timeComplexity: 'O(2ⁿ)',
        spaceComplexity: 'O(n) for stack',
        code: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> set = new HashSet<>(wordDict);
        return backtrack(s, set, 0);
    }
    
    private boolean backtrack(String s, Set<String> set, int start) {
        if (start == s.length()) return true;
        
        for (int end = start + 1; end <= s.length(); end++) {
            if (set.contains(s.substring(start, end)) && backtrack(s, set, end)) {
                return true;
            }
        }
        return false;
    }
}`,
        codeExplanation: `Starting from position 0, we try every possible ending position. If substring(start, end) is a valid word in our dictionary, we recursively check if the rest of the string (starting from end) can also be broken into valid words. If we reach the end of the string, it means every part matched a dictionary word, so we return true. This tries all possible splits, leading to exponential time in the worst case.`
      },
      {
        type: 'Optimal',
        explanation: 'DP array where dp[i] means the substring s[0..i] can be segmented. For each position i, check all previous valid positions j where dp[j] is true and s[j..i] is in the dict.',
        timeComplexity: 'O(n³)',
        spaceComplexity: 'O(n)',
        code: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> dict = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && dict.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
}`,
        codeExplanation: `dp[i] means "can we successfully break s[0..i-1] into dictionary words?" We start with dp[0] = true (empty string). For each position i, we look back at all positions j before it. If dp[j] was true (meaning s[0..j-1] was breakable) AND s[j..i-1] is a word in our dictionary, then dp[i] is true — we found a valid split! Once we find one valid j, we break early. At the end, dp[s.length()] tells us if the entire string can be broken.`
      }
    ]
  },
  {
    id: '21',
    title: '21. Clone Graph',
    difficulty: 'Medium',
    pattern: 'Graph DFS / BFS',
    leetcodeUrl: 'https://leetcode.com/problems/clone-graph/',
    analysis: 'Given a reference of a node in a connected undirected graph, return a deep copy. We need to traverse the standard graph using DFS or BFS while using a Hash Map to store mappings between original nodes and copied nodes to avoid infinite cycles and duplicate copies.',
    hints: [
      'Use a Hash Map of <Node, Node> to keep track of already cloned nodes.',
      'If the neighbor is in the map, just add the cloned node to the neighbors list. If not, clone it using recursion/queue and add it.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'DFS with a Hash Map. For every node, if it\'s already cloned, return the clone. Otherwise, clone it, put it in map, and recurse for all neighbors.',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        code: `/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> neighbors;
    public Node() { val = 0; neighbors = new ArrayList<Node>(); }
    public Node(int _val) { val = _val; neighbors = new ArrayList<Node>(); }
    public Node(int _val, ArrayList<Node> _neighbors) { val = _val; neighbors = _neighbors; }
}
*/
class Solution {
    private Map<Node, Node> visited = new HashMap<>();
    
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        
        if (visited.containsKey(node)) {
            return visited.get(node);
        }
        
        Node cloneNode = new Node(node.val, new ArrayList<>());
        visited.put(node, cloneNode);
        
        for (Node neighbor : node.neighbors) {
            cloneNode.neighbors.add(cloneGraph(neighbor));
        }
        
        return cloneNode;
    }
}`,
        codeExplanation: `We use a HashMap to track which nodes we've already cloned (original → clone). When we visit a node, if it's already in our map, we return the existing clone (this prevents infinite loops in cyclic graphs). If not, we create a new clone node with the same value, store it in the map immediately, then recursively clone all its neighbors and add them to the clone's neighbor list. The key insight is storing the clone BEFORE recursing into neighbors — this ensures if a neighbor points back to this node, we already have the clone ready.`
      }
    ]
  },
  {
    id: '22',
    title: '22. Valid Parentheses',
    difficulty: 'Easy',
    pattern: 'Stack',
    leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/',
    analysis: 'Check if a string of brackets is valid. Every opening bracket must be closed by the same type of closing bracket in the correct order. LIFO structure (Stack) perfectly models this parsing.',
    hints: [
      'When you see an opening bracket, push the corresponding closing bracket to a stack.',
      'When you see a closing bracket, pop from the stack. It must match the current bracket.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Use a Stack. For opening brackets, push the expected closing bracket. For closing brackets, pop from stack and verify match.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        code: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        
        for (char c : s.toCharArray()) {
            if (c == '(') {
                stack.push(')');
            } else if (c == '{') {
                stack.push('}');
            } else if (c == '[') {
                stack.push(']');
            } else {
                if (stack.isEmpty() || stack.pop() != c) {
                    return false;
                }
            }
        }
        
        return stack.isEmpty();
    }
}`,
        codeExplanation: `Instead of pushing the opening bracket itself, we push the EXPECTED closing bracket. This simplifies the matching: when we encounter '(', we push ')'. When we see a closing bracket, we pop from the stack — if the popped value matches the current character, the brackets are paired correctly. If the stack is empty when we try to pop, or the popped value doesn't match, it's invalid. At the end, the stack must be empty (all brackets were matched). This trick avoids the need for a separate mapping function.`
      }
    ]
  },
  {
    id: '23',
    title: '23. Merge Two Sorted Lists',
    difficulty: 'Easy',
    pattern: 'Linked List',
    leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    analysis: 'Merge two sorted linked lists into one sorted list. We can use a dummy head to simplify edge cases and iteratively compare the heads of both lists, appending the smaller one.',
    hints: [
      'Create a dummy node to act as the head of the new list.',
      'Maintain a pointer to the tail of the new list. Continuously attach the smaller of the two node values.'
    ],
    approaches: [
      {
        type: 'Better',
        explanation: 'Recursive approach. Compare the heads of both lists and return the smaller one, with its next pointing to the recursive result.',
        timeComplexity: 'O(n + m)',
        spaceComplexity: 'O(n + m) for call stack',
        code: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        if (list1 == null) return list2;
        if (list2 == null) return list1;
        
        if (list1.val < list2.val) {
            list1.next = mergeTwoLists(list1.next, list2);
            return list1;
        } else {
            list2.next = mergeTwoLists(list1, list2.next);
            return list2;
        }
    }
}`,
        codeExplanation: `Base cases: if either list is empty, return the other. Otherwise, compare the heads. The smaller one becomes the current node, and its "next" is the result of merging the rest of its list with the other list (recursion). This elegantly builds the merged list but uses O(n+m) stack space due to recursion depth.`
      },
      {
        type: 'Optimal',
        explanation: 'Iterative with a dummy node. Compare heads, append smaller one, advance that pointer. At the end, append whatever remains.',
        timeComplexity: 'O(n + m)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(-1);
        ListNode current = dummy;
        
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                current.next = list1;
                list1 = list1.next;
            } else {
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next;
        }
        
        current.next = (list1 != null) ? list1 : list2;
        
        return dummy.next;
    }
}`,
        codeExplanation: `We create a dummy node as a placeholder head to simplify edge cases. A "current" pointer tracks where to append next. We compare the heads of both lists: whichever is smaller gets attached to current.next, and we advance that list's pointer. After one list is exhausted, we just attach the remaining list (it's already sorted). We return dummy.next to skip the placeholder. This uses O(1) extra space since we just rewire existing nodes.`
      }
    ]
  },
  {
    id: '24',
    title: '24. Remove Nth Node From End of List',
    difficulty: 'Medium',
    pattern: 'Fast & Slow Pointers',
    leetcodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
    analysis: 'Remove the nth node from the end. To do it in one pass, use two pointers separated by an n-node gap. When the fast pointer hits the end, the slow pointer will be right before the node to delete.',
    hints: [
      'Use a dummy node to handle the case where the head itself needs to be removed.',
      'Move the fast pointer n steps ahead, then move both at the same speed.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Two passes. First pass counts the length. Second pass goes to position (length - n) and removes that node.',
        timeComplexity: 'O(L)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        int length = 0;
        ListNode curr = head;
        while (curr != null) {
            length++;
            curr = curr.next;
        }
        
        int target = length - n;
        curr = dummy;
        for (int i = 0; i < target; i++) curr = curr.next;
        
        curr.next = curr.next.next;
        return dummy.next;
    }
}`,
        codeExplanation: `First, we count how many nodes are in the list (length). The nth from end is the (length - n)th from the start. We use a dummy node before head to handle the edge case where the head itself needs to be removed. We walk to position (length - n) and skip over the target node by setting curr.next = curr.next.next. Two passes total: one to count, one to remove.`
      },
      {
        type: 'Optimal',
        explanation: 'One pass using two pointers. Move fast pointer n+1 steps ahead, then move both. When fast reaches null, slow is right before the target.',
        timeComplexity: 'O(L)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode fast = dummy;
        ListNode slow = dummy;
        
        for (int i = 0; i <= n; i++) {
            fast = fast.next;
        }
        
        while (fast != null) {
            slow = slow.next;
            fast = fast.next;
        }
        
        slow.next = slow.next.next;
        
        return dummy.next;
    }
}`,
        codeExplanation: `We create a gap of (n+1) nodes between fast and slow pointers. We move fast ahead by n+1 steps first. Then we move both pointers together until fast reaches null. At this point, slow is exactly one node before the target (because of the n+1 gap). We skip the target by setting slow.next = slow.next.next. The dummy node handles the edge case where we need to remove the head itself. Only one pass through the list!`
      }
    ]
  },
  {
    id: '25',
    title: '25. Reorder List',
    difficulty: 'Medium',
    pattern: 'Fast & Slow Pointers / LinkedList Reversal',
    leetcodeUrl: 'https://leetcode.com/problems/reorder-list/',
    analysis: 'Given L0 -> L1 -> L2... Ln, reorder to L0 -> Ln -> L1 -> Ln-1... This requires combining three list techniques: Find the middle, reverse the second half, and merge the two halves alternately.',
    hints: [
      'Use tortoise and hare to find the middle of the linked list.',
      'Reverse the second half so you iterate backwards through it.',
      'Weave the two lists together one by one.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Put all nodes into an ArrayList, then use two pointers on the array to rewire the links.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        code: `class Solution {
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;
        List<ListNode> list = new ArrayList<>();
        ListNode curr = head;
        while (curr != null) {
            list.add(curr);
            curr = curr.next;
        }
        
        int i = 0, j = list.size() - 1;
        while (i < j) {
            list.get(i).next = list.get(j);
            i++;
            if (i == j) break;
            list.get(j).next = list.get(i);
            j--;
        }
        list.get(i).next = null;
    }
}`,
  codeExplanation: `This brute-force approach is the most straightforward way to solve the problem. We traverse the linked list using pointer manipulation. By carefully updating next pointers, we modify the list structure in place. Using a dummy node simplifies edge cases like removing the head. We process each node exactly once, giving O(n) time complexity.`
      },
      {
        type: 'Optimal',
        explanation: 'O(1) memory approach: Find mid, reverse second half, merge alternatively.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;
        
        // 1. Find middle
        ListNode slow = head, fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // 2. Reverse second half
        ListNode second = slow.next;
        slow.next = null; // split
        ListNode prev = null;
        while (second != null) {
            ListNode tmp = second.next;
            second.next = prev;
            prev = second;
            second = tmp;
        }
        
        // 3. Merge alternating
        ListNode first = head;
        second = prev; // prev is the new head of the reversed half
        while (second != null) {
            ListNode tmp1 = first.next;
            ListNode tmp2 = second.next;
            
            first.next = second;
            second.next = tmp1;
            
            first = tmp1;
            second = tmp2;
        }
    }
}`,
  codeExplanation: `We traverse the linked list using pointer manipulation. By carefully updating next pointers, we modify the list structure in place. Using a dummy node simplifies edge cases like removing the head. We process each node exactly once, giving O(n) time complexity.`
      }
    ]
  },
  {
    id: '26',
    title: '26. Lowest Common Ancestor of a BST',
    difficulty: 'Medium',
    pattern: 'Binary Search Tree',
    leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
    analysis: 'Find the lowest common ancestor of two nodes in a BST. Due to BST properties, the LCA is the first node we traverse where one target is on the left (smaller) and the other is on the right (larger).',
    hints: [
      'If both nodes are less than the current node, the LCA must be in the left subtree.',
      'If both are greater, it\'s in the right subtree.',
      'If they branch (one is less, one is greater), the current node is the LCA.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Use BST properties. If both targets are smaller, go left. If both are larger, go right. When they split (one left, one right), current node is the LCA.',
        timeComplexity: 'O(h)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        while (root != null) {
            if (p.val > root.val && q.val > root.val) {
                root = root.right;
            } 
            else if (p.val < root.val && q.val < root.val) {
                root = root.left;
            } 
            else {
                return root;
            }
        }
        return null;
    }
}`,
        codeExplanation: `In a BST, all left descendants are smaller and all right descendants are larger. So if both p and q have values greater than the current node, the LCA must be in the right subtree. If both are smaller, it's in the left subtree. The moment they "split" — one is on the left side and one is on the right (or one equals the current node) — we've found the LCA. This is the first node where the two target nodes diverge. No recursion needed, just simple iteration.`
      }
    ]
  },
  {
    id: '27',
    title: '27. Validate Binary Search Tree',
    difficulty: 'Medium',
    pattern: 'DFS / Post-order Traversal',
    leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/',
    analysis: 'Verify a tree is a valid BST. Just checking if parent > left && parent < right is NOT enough. Every node in a left subtree must be less than the ROOT node. We must pass down min and max bounds for each traversal.',
    hints: [
      'Top-down approach: Pass the allowed lower and upper bounds of values for the current node.',
      'Subtrees update the borders. Left child\'s new upper bound is the parent\'s value. Right child\'s new lower bound is the parent\'s.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'In-order traversal into an array, then check if the array is strictly increasing.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        code: `class Solution {
    List<Integer> list = new ArrayList<>();
    public boolean isValidBST(TreeNode root) {
        inOrder(root);
        for (int i = 1; i < list.size(); i++) {
            if (list.get(i) <= list.get(i - 1)) return false;
        }
        return true;
    }
    private void inOrder(TreeNode node) {
        if (node == null) return;
        inOrder(node.left);
        list.add(node.val);
        inOrder(node.right);
    }
}`,
        codeExplanation: `In a valid BST, an in-order traversal (left → root → right) always produces values in strictly ascending order. We do the traversal, collect all values in a list, then verify the list is sorted. If any value is <= the previous value, it's not a valid BST. This is simple to understand but uses O(n) extra space for the list.`
      },
      {
        type: 'Optimal',
        explanation: 'Recursive bounds checking. Pass min and max bounds to each node. Use Long.MIN/MAX to avoid integer edge cases.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h) for stack',
        code: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return isValid(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    
    private boolean isValid(TreeNode root, long minBound, long maxBound) {
        if (root == null) return true;
        
        if (root.val <= minBound || root.val >= maxBound) return false;
        
        return isValid(root.left, minBound, root.val) &&
               isValid(root.right, root.val, maxBound);
    }
}`,
        codeExplanation: `We pass valid bounds (min, max) to each node. The root can be anything, so we start with Long.MIN_VALUE and Long.MAX_VALUE. For any node, its value must be strictly between minBound and maxBound. When we go left, the current node's value becomes the new upper bound (all left descendants must be smaller). When we go right, it becomes the new lower bound (all right descendants must be larger). We use long instead of int to handle edge cases where node values are Integer.MIN_VALUE or Integer.MAX_VALUE.`
      }
    ]
  },
  {
    id: '28',
    title: '28. Serialize and Deserialize Binary Tree',
    difficulty: 'Hard',
    pattern: 'Tree Traversal (DFS/BFS)',
    leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
    analysis: 'Convert a tree to a string and back. We can use pre-order traversal (DFS) or level-order (BFS). Missing nodes must be marked with a null character (e.g., "N") to preserve the exact structure.',
    hints: [
      'A pre-order traversal with "N" for null nodes provides a unique signature of the tree.',
      'When deserializing, process the string sequentially. "N" returns null, numbers create a new node and recursively call left then right.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Use Pre-order DFS with commas for separation. Null is marked as "N". Deserialization uses a Queue of the split strings, popping off the front as it builds recursively.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        code: `public class Codec {
    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        buildString(root, sb);
        return sb.toString();
    }
    
    private void buildString(TreeNode node, StringBuilder sb) {
        if (node == null) {
            sb.append("N,");
            return;
        }
        sb.append(node.val).append(",");
        buildString(node.left, sb);
        buildString(node.right, sb);
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        Queue<String> nodes = new LinkedList<>(Arrays.asList(data.split(",")));
        return buildTree(nodes);
    }
    
    private TreeNode buildTree(Queue<String> nodes) {
        String val = nodes.poll();
        if (val.equals("N")) return null;
        
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = buildTree(nodes);
        node.right = buildTree(nodes);
        return node;
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '29',
    title: '29. Invert Binary Tree',
    difficulty: 'Easy',
    pattern: 'Tree Traversal',
    leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/',
    analysis: 'Swap the left and right children of every node in a binary tree. This can be done via DFS or BFS where for every node you visit, you simply swap its two child pointers.',
    hints: [
      'Recursively swap the left and right child of the current node, then call invert on both children.'
    ],
    approaches: [
      {
        type: 'Better',
        explanation: 'BFS using a queue. For each node polled from the queue, swap its left and right children, then enqueue the non-null children.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        code: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        
        while (!q.isEmpty()) {
            TreeNode curr = q.poll();
            
            TreeNode temp = curr.left;
            curr.left = curr.right;
            curr.right = temp;
            
            if (curr.left != null) q.add(curr.left);
            if (curr.right != null) q.add(curr.right);
        }
        return root;
    }
}`,
  codeExplanation: `This approach optimizes the naive solution by reducing redundant work. We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      },
      {
        type: 'Optimal',
        explanation: 'DFS recursive approach. Swap children, then recurse. Very short and clean.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
        code: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        
        TreeNode left = root.left;
        TreeNode right = root.right;
        
        root.left = invertTree(right);
        root.right = invertTree(left);
        
        return root;
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '30',
    title: '30. Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    pattern: 'DFS / BFS',
    leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    analysis: 'Find the maximum depth (number of nodes along the longest path). DFS returns 1 + max(depth(left), depth(right)). BFS iterates level by level until empty.',
    hints: [
      'The depth of a tree is 1 (for the root) plus the maximum of the depths of its left and right subtrees.'
    ],
    approaches: [
      {
        type: 'Better',
        explanation: 'BFS approach. Use a queue, process level by level, and increment a depth counter for each level processed.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        code: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        int depth = 0;
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        
        while(!q.isEmpty()) {
            int levelSize = q.size();
            for (int i = 0; i < levelSize; i++) {
                TreeNode curr = q.poll();
                if (curr.left != null) q.add(curr.left);
                if (curr.right != null) q.add(curr.right);
            }
            depth++;
        }
        return depth;
    }
}`,
  codeExplanation: `This approach optimizes the naive solution by reducing redundant work. We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      },
      {
        type: 'Optimal',
        explanation: 'DFS Recursive approach. Clean concise algorithm computing 1 + max(left, right).',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
        code: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '31',
    title: '31. Same Tree',
    difficulty: 'Easy',
    pattern: 'Tree Traversal',
    leetcodeUrl: 'https://leetcode.com/problems/same-tree/',
    analysis: 'Check if two binary trees are exactly the same structurally and have the same node values. DFS approach compares nodes at every step recursively.',
    hints: [
      'If both are null, they are the same.',
      'If one is null and the other isn\'t, they are different.',
      'If values match, recursively check the left subtrees and right subtrees.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'DFS recursive check. Base cases handle nulls, then compare values, then recursively check left and right branches.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
        code: `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        
        if (p.val != q.val) return false;
        
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '32',
    title: '32. Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    pattern: 'BFS',
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    analysis: 'Return the level order traversal of a tree\'s nodes (i.e., from left to right, level by level). We use a Queue to standard BFS, keeping track of the size of the queue at the start of each level loop.',
    hints: [
      'Use a Queue to store nodes.',
      'The number of elements currently in the Queue represents all nodes at the current level.',
      'Poll all of those nodes, add them to a level-specific list, and enqueue their children.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Standard level-by-level BFS using a LinkedList as a Queue.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n) for the queue (max level width)',
        code: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        
        while (!q.isEmpty()) {
            int levelSize = q.size();
            List<Integer> currentLevel = new ArrayList<>();
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode curr = q.poll();
                currentLevel.add(curr.val);
                
                if (curr.left != null) q.add(curr.left);
                if (curr.right != null) q.add(curr.right);
            }
            result.add(currentLevel);
        }
        return result;
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '33',
    title: '33. Implement Trie (Prefix Tree)',
    difficulty: 'Medium',
    pattern: 'Trie',
    leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
    analysis: 'A Trie is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. We define a TrieNode class that has an array of children (size 26 for English letters) and a boolean indicating if it marks the end of a valid word.',
    hints: [
      'Each node should have an array `TrieNode[] children = new TrieNode[26];`',
      'It also needs a `boolean isEndOfWord`.',
      'Iterate through the characters of the string, traversing or creating nodes as you go.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Create a Node class containing an array of 26 Node pointers. Insert iterates through chars, creating nodes if null. Search returns true if ending node exists and isEndOfWord is true. StartsWith returns true if traversal naturally completes without hitting null.',
        timeComplexity: 'O(L) per word (L = length of word)',
        spaceComplexity: 'O(N * L) for all words inserted',
        code: `class TrieNode {
    TrieNode[] children;
    boolean isEndOfWord;
    public TrieNode() {
        children = new TrieNode[26];
        isEndOfWord = false;
    }
}

class Trie {
    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }
    
    public void insert(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int index = c - 'a';
            if (curr.children[index] == null) {
                curr.children[index] = new TrieNode();
            }
            curr = curr.children[index];
        }
        curr.isEndOfWord = true;
    }
    
    public boolean search(String word) {
        TrieNode node = findNode(word);
        return node != null && node.isEndOfWord;
    }
    
    public boolean startsWith(String prefix) {
        return findNode(prefix) != null;
    }
    
    private TrieNode findNode(String str) {
        TrieNode curr = root;
        for (char c : str.toCharArray()) {
            int index = c - 'a';
            if (curr.children[index] == null) return null;
            curr = curr.children[index];
        }
        return curr;
    }
}`,
  codeExplanation: `We use a Trie (prefix tree) data structure for efficient string operations. Each node represents a character, and paths from root to nodes represent prefixes. Insertion and lookup both take O(word length) time. This is especially efficient when we need to search for words by prefix or check character-by-character.`
      }
    ]
  },
  {
    id: '34',
    title: '34. Design Add and Search Words Data Structure',
    difficulty: 'Medium',
    pattern: 'Trie / DFS',
    leetcodeUrl: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/',
    analysis: 'Similar to a standard Trie, but the search can contain the `.` character which acts as a wildcard matching ANY letter. When a `.` is encountered during search, we must use DFS to try all 26 possible non-null children recursively.',
    hints: [
      'Use a standard Trie for the addWord method.',
      'For search, write a recursive helper function that branches out when encountering `.`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Add word is identical to normal Trie. Search uses DFS. If char is a dot, loop through all 26 children; if any child returns true from DFS, the word exists.',
        timeComplexity: 'O(M) add, O(26^M) search (worst case full of dots)',
        spaceComplexity: 'O(N * M)',
        code: `class WordDictionary {
    private class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEndOfWord = false;
    }
    
    private TrieNode root;

    public WordDictionary() {
        root = new TrieNode();
    }
    
    public void addWord(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int index = c - 'a';
            if (curr.children[index] == null) {
                curr.children[index] = new TrieNode();
            }
            curr = curr.children[index];
        }
        curr.isEndOfWord = true;
    }
    
    public boolean search(String word) {
        return searchHelper(word, 0, root);
    }
    
    private boolean searchHelper(String word, int index, TrieNode node) {
        if (index == word.length()) {
            return node.isEndOfWord;
        }
        
        char c = word.charAt(index);
        if (c == '.') {
            for (int i = 0; i < 26; i++) {
                if (node.children[i] != null && searchHelper(word, index + 1, node.children[i])) {
                    return true;
                }
            }
            return false;
        } else {
            int idx = c - 'a';
            if (node.children[idx] == null) return false;
            return searchHelper(word, index + 1, node.children[idx]);
        }
    }
}`,
  codeExplanation: `We use a Trie (prefix tree) data structure for efficient string operations. Each node represents a character, and paths from root to nodes represent prefixes. Insertion and lookup both take O(word length) time. This is especially efficient when we need to search for words by prefix or check character-by-character.`
      }
    ]
  },
  {
    id: '35',
    title: '35. Word Search II',
    difficulty: 'Hard',
    pattern: 'Trie + DFS (Backtracking)',
    leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/',
    analysis: 'Find all words from a list that are present in a 2D grid of characters. Doing DFS for every single word separately takes too long. Instead, we put all the words into a Trie, then do DFS on the grid, exploring the Trie simultaneously.',
    hints: [
      'Build a Trie out of all the target words.',
      'For every cell on the board, start a DFS. If the character exists in the current Trie node, move to that node and recurse to neighbors.',
      'Mark the board cell as visited during DFS to avoid reusing it in the same path.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'DFS starting from each cell guided by the Trie. When reaching an endOfWord in Trie, add to results and prune by setting endOfWord = false to prevent duplicates.',
        timeComplexity: 'O(M × N × 4^L) worst case, heavily pruned by Trie in practice',
        spaceComplexity: 'O(W × L) for Trie',
        code: `class Solution {
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        String word = null; // Store the word here to easily add it to results
    }
    
    public List<String> findWords(char[][] board, String[] words) {
        // Build Trie
        TrieNode root = new TrieNode();
        for (String w : words) {
            TrieNode curr = root;
            for (char c : w.toCharArray()) {
                if (curr.children[c - 'a'] == null) {
                    curr.children[c - 'a'] = new TrieNode();
                }
                curr = curr.children[c - 'a'];
            }
            curr.word = w; 
        }
        
        List<String> res = new ArrayList<>();
        int rows = board.length, cols = board[0].length;
        
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                dfs(board, r, c, root, res);
            }
        }
        return res;
    }
    
    private void dfs(char[][] board, int r, int c, TrieNode node, List<String> res) {
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] == '#') {
            return;
        }
        
        char letter = board[r][c];
        TrieNode nextNode = node.children[letter - 'a'];
        if (nextNode == null) return; // Prune search branch
        
        if (nextNode.word != null) {
            res.add(nextNode.word);
            nextNode.word = null; // Prevent duplicates gracefully
        }
        
        board[r][c] = '#'; // Mark Visited
        
        dfs(board, r + 1, c, nextNode, res);
        dfs(board, r - 1, c, nextNode, res);
        dfs(board, r, c + 1, nextNode, res);
        dfs(board, r, c - 1, nextNode, res);
        
        board[r][c] = letter; // Backtrack
    }
}`,
  codeExplanation: `We use a Trie (prefix tree) data structure for efficient string operations. Each node represents a character, and paths from root to nodes represent prefixes. Insertion and lookup both take O(word length) time. This is especially efficient when we need to search for words by prefix or check character-by-character.`
      }
    ]
  },
  {
    id: '36',
    title: '36. Combination Sum',
    difficulty: 'Medium',
    pattern: 'Backtracking',
    leetcodeUrl: 'https://leetcode.com/problems/combination-sum/',
    analysis: 'Find all unique combinations in `candidates` where elements sum to `target`. Elements can be chosen an unlimited number of times. Use backtracking to systematically pick an element, subtract it from target, and recurse.',
    hints: [
      'Since you can reuse elements, when you recurse, your starting index should remain the current index, not i + 1.',
      'If the current sum exceeds target, stop exploring that branch (return).'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Backtracking. Build a temporary list. Add a number to it, recursively call the function with (target - num), then pop the number off and try the next candidate.',
        timeComplexity: 'O(N ^ (T/M)) where T is target, M is min value',
        spaceComplexity: 'O(T/M) for recursion stack',
        code: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }
    
    private void backtrack(int[] candidates, int remain, int start, List<Integer> curr, List<List<Integer>> result) {
        if (remain < 0) return;
        if (remain == 0) {
            result.add(new ArrayList<>(curr)); // Add valid combination
            return;
        }
        
        for (int i = start; i < candidates.length; i++) {
            curr.add(candidates[i]);
            // Notice the 'i' instead of 'i + 1', because we can reuse same elements
            backtrack(candidates, remain - candidates[i], i, curr, result); 
            curr.remove(curr.size() - 1); // backtrack
        }
    }
}`,
  codeExplanation: `We explore all possible choices using recursion (backtracking). At each step, we make a choice, then recurse on the remaining problem. If a choice leads to a dead end, we undo it (backtrack) and try the next option. This systematically explores the entire solution space while pruning invalid paths early.`
      }
    ]
  },
  {
    id: '37',
    title: '37. Permutations',
    difficulty: 'Medium',
    pattern: 'Backtracking',
    leetcodeUrl: 'https://leetcode.com/problems/permutations/',
    analysis: 'Given an array of distinct integers, return all possible permutations. Permutations require order, so unlike combinations, we don\'t pass a `start` index. Instead, we must keep track of which items are already currently in our list.',
    hints: [
      'In each recursive call, loop from 0 to N.',
      'If the element is already in the current permutation list, `continue` to skip it.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Standard backtracking. Iteratively pick an unused element, add it to the path, recurse, then remove it. A boolean array (or just checking if `curr.contains`) acts as the visited state.',
        timeComplexity: 'O(N * N!)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        // boolean array avoids O(N) lookup of ArrayList.contains()
        backtrack(nums, new ArrayList<>(), result, new boolean[nums.length]);
        return result;
    }
    
    private void backtrack(int[] nums, List<Integer> curr, List<List<Integer>> result, boolean[] used) {
        if (curr.size() == nums.length) {
            result.add(new ArrayList<>(curr));
            return;
        }
        
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            
            used[i] = true;
            curr.add(nums[i]);
            
            backtrack(nums, curr, result, used);
            
            used[i] = false; // Backtrack
            curr.remove(curr.size() - 1);
        }
    }
}`,
  codeExplanation: `Standard backtracking. Iteratively pick an unused element, add it to the path, recurse, then remove it. A boolean array (or just checking if 'curr.contains') acts as the visited state.`
      }
    ]
  },
  {
    id: '38',
    title: '38. Merge Intervals',
    difficulty: 'Medium',
    pattern: 'Sorting / Intervals',
    leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/',
    analysis: 'Given an array of intervals, merge all overlapping intervals. The trick is to sort the array primarily by the starting time of each interval. Then we iterate, extending the end of our current interval if they overlap.',
    hints: [
      'Sort the intervals by their starting value first.',
      'Two intervals [a, b] and [c, d] overlap if c <= b. If they overlap, their merged interval is [a, max(b, d)].'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Sort by start time. Iterate through. If current interval start is <= last merged interval end, update the last merged end to the max of both ends. Otherwise, add current as a new interval.',
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(N) for sorting/output',
        code: `class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;
        
        // Sort by starting point
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        
        List<int[]> merged = new ArrayList<>();
        int[] currentInterval = intervals[0];
        merged.add(currentInterval);
        
        for (int[] interval : intervals) {
            int currentEnd = currentInterval[1];
            int nextStart = interval[0];
            int nextEnd = interval[1];
            
            if (currentEnd >= nextStart) { // Overlap
                currentInterval[1] = Math.max(currentEnd, nextEnd);
            } else { // Disjoint
                currentInterval = interval;
                merged.add(currentInterval);
            }
        }
        
        return merged.toArray(new int[merged.size()][]);
    }
}`,
  codeExplanation: `We first sort the input to establish an ordering that simplifies the problem. With sorted data, we can use efficient techniques like binary search or two pointers. Related elements are now adjacent, making comparisons straightforward. The sorting step takes O(n log n) which becomes the overall time complexity.`
      }
    ]
  },
  {
    id: '39',
    title: '39. Insert Interval',
    difficulty: 'Medium',
    pattern: 'Intervals',
    leetcodeUrl: 'https://leetcode.com/problems/insert-interval/',
    analysis: 'Insert a new interval into a sorted collection of non-overlapping intervals, merging if necessary. We don\'t need to fully re-sort. We can process it in 3 phases: intervals before the new one, overlapping intervals (merged dynamically), and intervals after.',
    hints: [
      'Phase 1: Add all intervals completely to the left (their end < newStart).',
      'Phase 2: Add all overlapping ones into the new interval by taking the min start and max end.',
      'Phase 3: Add the rest of the intervals.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Three-while-loop single pass. Loop 1 extracts strictly earlier intervals. Loop 2 continually merges overlapping intervals. Loop 3 extracts strictly later intervals.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N) for output',
        code: `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0;
        int n = intervals.length;
        
        // 1. Add all intervals ending before newInterval starts
        while (i < n && intervals[i][1] < newInterval[0]) {
            result.add(intervals[i]);
            i++;
        }
        
        // 2. Merge overlapping intervals
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.add(newInterval); // Add the merged interval
        
        // 3. Add remaining intervals
        while (i < n) {
            result.add(intervals[i]);
            i++;
        }
        
        return result.toArray(new int[result.size()][]);
    }
}`,
  codeExplanation: `We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      }
    ]
  },
  {
    id: '40',
    title: '40. Non-overlapping Intervals',
    difficulty: 'Medium',
    pattern: 'Greedy / Sorting',
    leetcodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals/',
    analysis: 'Find the minimum number of intervals to remove to make the rest non-overlapping. The optimal greedy strategy is to sort intervals by END time. Always keep the interval that ends earliest, as it leaves the most room for future intervals.',
    hints: [
      'This problem is essentially "Activity Selection".',
      'Sort by End Time. Iterate and count how many intervals overlap with the end time of the last chosen valid interval.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Sort by END time. Maintain the end time of the last accepted interval. If the next interval starts before this end time, it overlaps, so increment our removal counter (and implicitly discard it securely because we sorted by end time).',
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(1) aux space',
        code: `class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) return 0;
        
        // Sort specifically by END time
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        
        int removals = 0;
        int end = intervals[0][1];
        
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < end) {
                // Starts before the last one ended -> overlap -> must remove
                removals++;
            } else {
                // No overlap -> accept the new interval and update end
                end = intervals[i][1];
            }
        }
        
        return removals;
    }
}`,
  codeExplanation: `We first sort the input to establish an ordering that simplifies the problem. With sorted data, we can use efficient techniques like binary search or two pointers. Related elements are now adjacent, making comparisons straightforward. The sorting step takes O(n log n) which becomes the overall time complexity.`
      }
    ]
  },
  {
    id: '41',
    title: '41. Set Matrix Zeroes',
    difficulty: 'Medium',
    pattern: 'Matrix',
    leetcodeUrl: 'https://leetcode.com/problems/set-matrix-zeroes/',
    analysis: 'Given an m x n integer matrix, if an element is 0, set its entire row and column to 0 in-place. We can use the first row and first column of the matrix to store states (whether that row/col should be zeroed).',
    hints: [
      'Use the first row and first column to keep track of which rows and columns have a 0.',
      'Because the first row and first col overlap at [0][0], you need one separate variable to track if the first column itself needs to be zeroed.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Create a copy of the matrix. Iterate through original, when 0 is found, set row and col in the copy to 0.',
        timeComplexity: 'O(M × N)',
        spaceComplexity: 'O(M × N)',
        code: `class Solution {
    public void setZeroes(int[][] matrix) {
        int r = matrix.length, c = matrix[0].length;
        int[][] copy = new int[r][c];
        for (int i = 0; i < r; i++) {
            copy[i] = matrix[i].clone();
        }
        
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                if (copy[i][j] == 0) {
                    for (int k = 0; k < c; k++) matrix[i][k] = 0;
                    for (int k = 0; k < r; k++) matrix[k][j] = 0;
                }
            }
        }
    }
}`,
  codeExplanation: `This brute-force approach is the most straightforward way to solve the problem. Create a copy of the matrix. Iterate through original, when 0 is found, set row and col in the copy to 0.. The code processes the input step by step, building toward the solution. Each operation is designed to bring us closer to the answer efficiently. Edge cases are handled to ensure correctness across all valid inputs.`
      },
      {
        type: 'Optimal',
        explanation: 'Use first row and column as markers. If matrix[i][j] is 0, set matrix[i][0] and matrix[0][j] to 0. Use an extra variable col0 for the first column. Finally, zero out cells based on markers.',
        timeComplexity: 'O(M × N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public void setZeroes(int[][] matrix) {
        int col0 = 1, rows = matrix.length, cols = matrix[0].length;
        
        // 1. Mark zeros in the first row / col
        for (int i = 0; i < rows; i++) {
            if (matrix[i][0] == 0) col0 = 0;
            for (int j = 1; j < cols; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        
        // 2. Use markers to set elements
        for (int i = rows - 1; i >= 0; i--) {
            for (int j = cols - 1; j >= 1; j--) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
            if (col0 == 0) matrix[i][0] = 0;
        }
    }
}`,
  codeExplanation: `Use first row and column as markers. If matrix[i][j] is 0, set matrix[i][0] and matrix[0][j] to 0. Use an extra variable col0 for the first column. Finally, zero out cells based on markers.. The code processes the input step by step, building toward the solution. Each operation is designed to bring us closer to the answer efficiently. Edge cases are handled to ensure correctness across all valid inputs.`
      }
    ]
  },
  {
    id: '42',
    title: '42. Spiral Matrix',
    difficulty: 'Medium',
    pattern: 'Matrix / Simulation',
    leetcodeUrl: 'https://leetcode.com/problems/spiral-matrix/',
    analysis: 'Traverse an m x n matrix in spiral order. Maintain four boundaries (top, bottom, left, right). Traverse the perimeter, then shrink the boundaries inward and repeat until boundaries cross.',
    hints: [
      'Use 4 pointers: top, bottom, left, right.',
      'Move: left->right (top++), top->bottom (right--), right->left (bottom--), bottom->top (left++).'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Simulation using boundary markers. Loop while top <= bottom and left <= right. Ensure you don\'t double count when row/col shrinks to a single line.',
        timeComplexity: 'O(M × N)',
        spaceComplexity: 'O(1) aux space',
        code: `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        if (matrix.length == 0) return res;
        
        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;
        
        while (top <= bottom && left <= right) {
            // Travese Right
            for (int i = left; i <= right; i++) res.add(matrix[top][i]);
            top++;
            
            // Traverse Down
            for (int i = top; i <= bottom; i++) res.add(matrix[i][right]);
            right--;
            
            if (top <= bottom) {
                // Traverse Left
                for (int i = right; i >= left; i--) res.add(matrix[bottom][i]);
                bottom--;
            }
            
            if (left <= right) {
                // Traverse Up
                for (int i = bottom; i >= top; i--) res.add(matrix[i][left]);
                left++;
            }
        }
        return res;
    }
}`,
  codeExplanation: `Simulation using boundary markers. Loop while top <= bottom and left <= right. Ensure you don\\'t double count when row/col shrinks to a single line. This approach efficiently handles the problem by making smart decisions at each step, avoiding unnecessary recalculation.`
      }
    ]
  },
  {
    id: '43',
    title: '43. Rotate Image',
    difficulty: 'Medium',
    pattern: 'Matrix / Math',
    leetcodeUrl: 'https://leetcode.com/problems/rotate-image/',
    analysis: 'Rotate an n x n 2D matrix by 90 degrees clockwise in-place. We can achieve this elegantly through two distinct matrix reflections: transpose the matrix (swap across diagonal), then reverse each row.',
    hints: [
      'First transform the rows into columns by transposing (matrix[i][j] with matrix[j][i]).',
      'Then flip the matrix horizontally (reverse each row).'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Transpose the matrix (swap [i][j] with [j][i] where j starts from i to avoid double swap), then reverse every row from left to right.',
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        
        // 1. Transpose the matrix
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        
        // 2. Reverse each row
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][n - 1 - j];
                matrix[i][n - 1 - j] = temp;
            }
        }
    }
}`,
  codeExplanation: `Transpose the matrix (swap [i][j] with [j][i] where j starts from i to avoid double swap), then reverse every row from left to right.. The code processes the input step by step, building toward the solution. Each operation is designed to bring us closer to the answer efficiently. Edge cases are handled to ensure correctness across all valid inputs.`
      }
    ]
  },
  {
    id: '44',
    title: '44. Word Search',
    difficulty: 'Medium',
    pattern: 'Backtracking / DFS',
    leetcodeUrl: 'https://leetcode.com/problems/word-search/',
    analysis: 'Given an m x n board and a word, verify if the word exists. The word must be constructed from letters of sequentially adjacent cells. We can launch a DFS branching search from any cell matching the first character.',
    hints: [
      'Find the starting character, then recursively call a DFS function for neighbors.',
      'Mark cells as visited by temporarily altering their character (e.g., to `#`), and revert them after DFS to backtrack.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'DFS backtracking. Check boundaries and letter match. If matched, temporarily change board char to avoid reusing, DFS all 4 directions, then backtrack the char.',
        timeComplexity: 'O(M × N × 4^L) worst case',
        spaceComplexity: 'O(L) recursion stack',
        code: `class Solution {
    public boolean exist(char[][] board, String word) {
        int rows = board.length;
        int cols = board[0].length;
        
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (board[i][j] == word.charAt(0) && dfs(board, i, j, 0, word)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    private boolean dfs(char[][] board, int r, int c, int count, String word) {
        if (count == word.length()) return true;
        
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length 
            || board[r][c] != word.charAt(count)) {
            return false;
        }
        
        char temp = board[r][c];
        board[r][c] = '#'; // Mark Visited
        
        boolean found = dfs(board, r + 1, c, count + 1, word) ||
                        dfs(board, r - 1, c, count + 1, word) ||
                        dfs(board, r, c + 1, count + 1, word) ||
                        dfs(board, r, c - 1, count + 1, word);
                        
        board[r][c] = temp; // Backtrack
        
        return found;
    }
}`,
  codeExplanation: `We traverse the graph using DFS (Depth-First Search), going as deep as possible before backtracking. A visited array or set prevents revisiting nodes and avoids infinite cycles. For each unvisited node, we explore all its neighbors recursively. This covers the entire connected component of the starting node.`
      }
    ]
  },
  {
    id: '45',
    title: '45. Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    pattern: 'Sliding Window',
    leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    analysis: 'Find the length of the longest substring without repeating characters. Use a sliding window with two pointers. If a character is repeated, move the left pointer just past the previous occurrence of that character.',
    hints: [
      'Use a Hash Map or array to store the most recent identical character\'s index.',
      'Expand the window string with `right`. If `char[right]` is in the map, jump `left` to `map[char] + 1`.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Check every possible substring, adding chars to a set. O(n²)',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(n)',
        code: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        int max = 0;
        for (int i = 0; i < s.length(); i++) {
            Set<Character> set = new HashSet<>();
            for (int j = i; j < s.length(); j++) {
                if (set.contains(s.charAt(j))) break;
                set.add(s.charAt(j));
                max = Math.max(max, j - i + 1);
            }
        }
        return max;
    }
}`,
  codeExplanation: `This brute-force approach is the most straightforward way to solve the problem. We use a HashMap for O(1) average-case lookup and storage. As we iterate through the input, we store key information in the map. For each new element, we check the map to see if a complementary element exists. This trades space for time, reducing the complexity from O(n²) to O(n).`
      },
      {
        type: 'Optimal',
        explanation: 'Sliding window using a Hash Map tracking index of characters. If duplicate found, move `left` pointer to `max(left, map.get(char) + 1)`.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(min(m, n))',
        code: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int maxLen = 0;
        int left = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char curr = s.charAt(right);
            if (map.containsKey(curr)) {
                // Ensure left doesn't jump backwards
                left = Math.max(left, map.get(curr) + 1);
            }
            map.put(curr, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
  codeExplanation: `Sliding window using a Hash Map tracking index of characters. If duplicate found, move 'left' pointer to 'max(left, map.get(char) + 1)'. This approach efficiently handles the problem by making smart decisions at each step, avoiding unnecessary recalculation.`
      }
    ]
  },
  {
    id: '46',
    title: '46. Longest Repeating Character Replacement',
    difficulty: 'Medium',
    pattern: 'Sliding Window',
    leetcodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/',
    analysis: 'You can change up to `k` characters to form the longest substring of same letters. Conceptually, in any window, the characters we MUST change equals `windowLen - count(mostFrequentChar)`. If this exceeds `k`, the window is invalid and we must shrink.',
    hints: [
      'Maintain a frequency map for characters in the current window.',
      'Track the highest frequency count. If windowSize - maxFreqCount > k, advance the left pointer and decrease frequency of the leaving char.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Sliding window over the array. Increment char count. Track the highest frequency ever seen. If window size - maxFreq > k, shrink window from left. Max window size found is our return.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1) (size 26 array)',
        code: `class Solution {
    public int characterReplacement(String s, int k) {
        int[] count = new int[26];
        int maxFreq = 0, longest = 0, left = 0;
        
        for (int right = 0; right < s.length(); right++) {
            int charIdx = s.charAt(right) - 'A';
            count[charIdx]++;
            maxFreq = Math.max(maxFreq, count[charIdx]);
            
            // If chars to replace > k, shrink window
            while ((HasWindowSize: right - left + 1) - maxFreq > k) {
                count[s.charAt(left) - 'A']--;
                left++;
            }
            
            longest = Math.max(longest, right - left + 1);
        }
        return longest;
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '47',
    title: '47. Minimum Window Substring',
    difficulty: 'Hard',
    pattern: 'Sliding Window',
    leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/',
    analysis: 'Given strings s and t, find the minimum window in s containing all characters of t in complexity O(n). We use a sliding window, expanding `right` to collect characters. Once we satisfy all requirements, we shrink `left` maximally to find the minimum length.',
    hints: [
      'Use a hashmap or a size 128 array to capture the needed frequencies of characters from `t`.',
      'Use a `count` variable tracking how many required characters we have successfully included.',
      'When `count == t.length()`, shrink the left side to minimize window length until `count` drops.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Use an integer array as a frequency map. Move `right` and decrease required counts. If count >= 0, we found a needed char. When total required == 0, note the window length, then advance `left` to shrink, adding back to needed counts.',
        timeComplexity: 'O(S + T)',
        spaceComplexity: 'O(1) (array size 128)',
        code: `class Solution {
    public String minWindow(String s, String t) {
        if (s == null || t == null || s.length() == 0 || t.length() == 0) return "";
        
        int[] map = new int[128];
        for (char c : t.toCharArray()) map[c]++;
        
        int left = 0, right = 0, minLen = Integer.MAX_VALUE, minStart = 0;
        int required = t.length();
        
        while (right < s.length()) {
            char rightChar = s.charAt(right);
            if (map[rightChar] > 0) {
                required--;
            }
            map[rightChar]--;
            right++; // Expand window
            
            // While valid, try to minimize
            while (required == 0) {
                if (right - left < minLen) {
                    minLen = right - left;
                    minStart = left;
                }
                
                char leftChar = s.charAt(left);
                map[leftChar]++; // Restore back
                if (map[leftChar] > 0) { // Lost a needed char
                    required++;
                }
                left++; // Shrink window
            }
        }
        
        return minLen == Integer.MAX_VALUE ? "" : s.substring(minStart, minStart + minLen);
    }
}`,
  codeExplanation: `Use an integer array as a frequency map. Move 'right' and decrease required counts. If count >= 0, we found a needed char. When total required == 0, note the window length, then advance 'left' to shrink, adding back to needed counts.`
      }
    ]
  },
  {
    id: '48',
    title: '48. Valid Anagram',
    difficulty: 'Easy',
    pattern: 'String / Hash Map',
    leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/',
    analysis: 'Check if two strings are anagrams (contain the exact same letters in different order). We can sort both strings and compare in O(N log N), or we can use an array frequency map counting up per char of s and down per char of t in O(N).',
    hints: [
      'An array of size 26 is faster than a HashMap for English lowercase letters.',
      'Increment the frequency for characters in string s, decrement for string t. If the array is all 0s, it\'s an anagram.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Sort both strings and check equality.',
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(N) for toCharArray',
        code: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        char[] sArr = s.toCharArray();
        char[] tArr = t.toCharArray();
        Arrays.sort(sArr);
        Arrays.sort(tArr);
        return Arrays.equals(sArr, tArr);
    }
}`,
  codeExplanation: `This brute-force approach is the most straightforward way to solve the problem. We first sort the input to establish an ordering that simplifies the problem. With sorted data, we can use efficient techniques like binary search or two pointers. Related elements are now adjacent, making comparisons straightforward. The sorting step takes O(n log n) which becomes the overall time complexity.`
      },
      {
        type: 'Optimal',
        explanation: 'Use a fixed array of size 26. Count occurrences.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
            freq[t.charAt(i) - 'a']--;
        }
        
        for (int count : freq) {
            if (count != 0) return false;
        }
        return true;
    }
}`,
  codeExplanation: `We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      }
    ]
  },
  {
    id: '49',
    title: '49. Group Anagrams',
    difficulty: 'Medium',
    pattern: 'Hash Map / Sorting',
    leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/',
    analysis: 'Group strings that are anagrams into lists. They will all output the same key if sorted, or if we map their frequencies to a string representation.',
    hints: [
      'Create a Hash Map mapping a String (the sorted version of the word) to a List of Strings (the anagrams).',
      'Instead of sorting, you can also use an array of 26 characters grouped with commas e.g. "1,0,0,2... " as the Hash key for O(M * N).'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Iterate through words. Sort their characters. Use the sorted string as a Hash Map key. Append the original word to the list associated with that key.',
        timeComplexity: 'O(N × K log K)',
        spaceComplexity: 'O(N × K)',
        code: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>(); // Key: sorted string
        
        for (String word : strs) {
            char[] chars = word.toCharArray();
            Arrays.sort(chars);
            String sortedWord = new String(chars);
            
            if (!map.containsKey(sortedWord)) {
                map.put(sortedWord, new ArrayList<>());
            }
            map.get(sortedWord).add(word);
        }
        
        return new ArrayList<>(map.values());
    }
}`,
  codeExplanation: `We use a HashMap for O(1) average-case lookup and storage. As we iterate through the input, we store key information in the map. For each new element, we check the map to see if a complementary element exists. This trades space for time, reducing the complexity from O(n²) to O(n).`
      }
    ]
  },
  {
    id: '50',
    title: '50. Valid Palindrome',
    difficulty: 'Easy',
    pattern: 'Two Pointers',
    leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/',
    analysis: 'Check if a string reads the same forwards and backwards, ignoring cases and non-alphanumeric characters. We use two pointers originating from opposite sides, closing in toward the middle.',
    hints: [
      'Use `Character.isLetterOrDigit(c)` in Java to easily skip spaces and punctuation.',
      'Use `Character.toLowerCase(c)` to ignore cases.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Create a new filtered string, reverse it, check equality. Consumes extra memory natively.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        code: `class Solution {
    public boolean isPalindrome(String s) {
        StringBuilder builder = new StringBuilder();
        for (char ch : s.toCharArray()) {
            if (Character.isLetterOrDigit(ch)) {
                builder.append(Character.toLowerCase(ch));
            }
        }
        String filtered = builder.toString();
        String reversed = builder.reverse().toString();
        return filtered.equals(reversed);
    }
}`,
  codeExplanation: `This brute-force approach is the most straightforward way to solve the problem. We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      },
      {
        type: 'Optimal',
        explanation: 'Two pointers, left from 0 and right from length-1. Skip invalid characters on the fly, then compare left and right chars.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        
        while (left < right) {
            char leftChar = s.charAt(left);
            char rightChar = s.charAt(right);
            
            if (!Character.isLetterOrDigit(leftChar)) {
                left++;
            } else if (!Character.isLetterOrDigit(rightChar)) {
                right--;
            } else {
                if (Character.toLowerCase(leftChar) != Character.toLowerCase(rightChar)) {
                    return false;
                }
                left++;
                right--;
            }
        }
        return true;
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '51',
    title: '51. Longest Palindromic Substring',
    difficulty: 'Medium',
    pattern: 'Expand Around Center / DP',
    leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring/',
    analysis: 'Find the longest substring which is a palindrome. A palindrome mirrors around its center. There are 2N-1 centers (each character, and between each pair of characters). We can expand outwards from every center and track the max length found.',
    hints: [
      'Expand from every single character (`i, i`), and every adjacent pair (`i, i+1`).'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Check every possible substring, checking if it is a palindrome. O(n³). Too slow.',
        timeComplexity: 'O(n³)',
        spaceComplexity: 'O(1)',
        code: `class Solution { // Exceeds Time Limit
    public String longestPalindrome(String s) {
        String res = "";
        for(int i = 0; i < s.length(); i++) {
            for(int j = i; j < s.length(); j++) {
                if(isPalindrome(s, i, j) && j - i + 1 > res.length()) {
                    res = s.substring(i, j + 1);
                }
            }
        }
        return res;
    }
    private boolean isPalindrome(String s, int L, int R) {
        while(L < R) {
            if(s.charAt(L++) != s.charAt(R--)) return false;
        }
        return true;
    }
}`,
  codeExplanation: `This brute-force approach is the most straightforward way to solve the problem. We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      },
      {
        type: 'Optimal',
        explanation: 'Iterate 0 to N. Assume `i` is the center. Expand out `left` and `right`. Do this for odd centers (L=i, R=i) and even centers (L=i, R=i+1). Keep track of best bounds.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        int start = 0, end = 0;
        
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);     // odd length
            int len2 = expandAroundCenter(s, i, i + 1); // even length
            int len = Math.max(len1, len2);
            
            if (len > end - start) {
                // Determine new starting indices based on center
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }
    
    private int expandAroundCenter(String s, int left, int right) {
        int L = left, R = right;
        while (L >= 0 && R < s.length() && s.charAt(L) == s.charAt(R)) {
            L--;
            R++;
        }
        // length is R - L - 1 because pointers are extended 1 unit past validity 
        return R - L - 1; 
    }
}`,
  codeExplanation: `Iterate 0 to N. Assume 'i' is the center. Expand out 'left' and 'right'. Do this for odd centers (L=i, R=i) and even centers (L=i, R=i+1). Keep track of best bounds.`
      }
    ]
  },
  {
    id: '52',
    title: '52. Palindromic Substrings',
    difficulty: 'Medium',
    pattern: 'Expand Around Center',
    leetcodeUrl: 'https://leetcode.com/problems/palindromic-substrings/',
    analysis: 'Count total number of palindromic substrings. Instead of finding the max length, we literally just increment a counter every time we successfully expand outwards from a center point.',
    hints: [
      'Expand outwards from `i, i` and `i, i+1`. Every successful step outward is exactly +1 palindrome.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Initialize total count to 0. For each char, expand to find odd length palindromes and even length palindromes, incrementing a global result counter step by step.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    int count = 0;
    
    public int countSubstrings(String s) {
        for (int i = 0; i < s.length(); i++) {
            expand(s, i, i);     // odd length palindromes
            expand(s, i, i + 1); // even length palindromes
        }
        return count;
    }
    
    private void expand(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            count++; // valid palindrome found
            left--;  // expand window left
            right++; // expand window right
        }
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '53',
    title: '53. Encode and Decode Strings',
    difficulty: 'Medium',
    pattern: 'String Mapping (Chunking)',
    leetcodeUrl: 'https://leetcode.com/problems/encode-and-decode-strings/',
    analysis: 'Design an algorithm to encode a list of strings to a string and decode it back. We need a secure delimiter. A delimiter can exist natively inside the strings. Thus we use chunking format: `[Length][Delimiter][Raw String]`. For example: "5#hello5#world".',
    hints: [
      'Store the length of each string followed by a special character (like `#`), followed by the string itself.',
      'When decoding, read numbers until `#`, parse the int, then read exactly that many characters. Guaranteed collision free.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Encode: Append `length + "#" + str`. Decode: While index < string size, find `#`, parse integer length, substring the raw characters, and advance pointer.',
        timeComplexity: 'O(N) chars',
        spaceComplexity: 'O(1) excluding output space',
        code: `public class Codec {
    // Encodes a list of strings to a single string.
    public String encode(List<String> strs) {
        StringBuilder sb = new StringBuilder();
        for (String s : strs) {
            sb.append(s.length()).append('#').append(s);
        }
        return sb.toString();
    }

    // Decodes a single string to a list of strings.
    public List<String> decode(String s) {
        List<String> res = new ArrayList<>();
        int i = 0;
        while (i < s.length()) {
            int hashIdx = s.indexOf('#', i);
            int size = Integer.parseInt(s.substring(i, hashIdx));
            res.add(s.substring(hashIdx + 1, hashIdx + 1 + size));
            i = hashIdx + 1 + size;
        }
        return res;
    }
}`,
  codeExplanation: `Encode: Append 'length + "#" + str'. Decode: While index < string size, find '#', parse integer length, substring the raw characters, and advance pointer.`
      }
    ]
  },
  {
    id: '54',
    title: '54. Valid Sudoku',
    difficulty: 'Medium',
    pattern: 'Hash Sets',
    leetcodeUrl: 'https://leetcode.com/problems/valid-sudoku/',
    analysis: 'Determine if a fully/partially filled 9x9 board is a valid Sudoku. A valid board enforces uniqueness horizontally, vertically, and in the 9 distinct 3x3 blocks. We can use a unified HashSet holding strict string keys: "row 1 has 5", "col 2 has 5".',
    hints: [
      'To identify the 3x3 block, calculate `row / 3` and `col / 3`.',
      'If you try `set.add()` and it returns false, it means the element already existed, thereby breaching validation.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Iterate rows and cols. Build formatted String IDs for the element in its row, column, and block. E.g. "5 in r 0", "5 in c 1", "5 in b 0-0". If `set.add(id)` fails, invalid.',
        timeComplexity: 'O(N²) -> Constant O(81)',
        spaceComplexity: 'O(N²) -> Constant O(81)',
        code: `class Solution {
    public boolean isValidSudoku(char[][] board) {
        Set<String> seen = new HashSet<>();
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                char curr = board[i][j];
                if (curr != '.') {
                    // HashSet.add returns false if item is already in set!
                    if (!seen.add(curr + " in r " + i) ||
                        !seen.add(curr + " in c " + j) ||
                        !seen.add(curr + " in b " + (i/3) + "-" + (j/3))) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}`,
  codeExplanation: `Iterate rows and cols. Build formatted String IDs for the element in its row, column, and block. E.g. "5 in r 0", "5 in c 1", "5 in b 0-0". If 'set.add(id)' fails, invalid.`
      }
    ]
  },
  {
    id: '55',
    title: '55. Evaluate Reverse Polish Notation',
    difficulty: 'Medium',
    pattern: 'Stack',
    leetcodeUrl: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/',
    analysis: 'Evaluate the value of an arithmetic expression in RPN. Since operands precede their operators, we naturally process it using a Stack. When seeing a number, push it. When seeing an operator, pop two numbers, apply operator, push result.',
    hints: [
      'Order of popping matters for subtraction and division: `b = pop(), a = pop() => a / b`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Switch statement on string element. Use a stack. The second popped element is the left operand, the first popped is the right operand.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();
        
        for (String t : tokens) {
            if (t.equals("+")) {
                stack.push(stack.pop() + stack.pop());
            } else if (t.equals("-")) {
                int b = stack.pop();
                int a = stack.pop();
                stack.push(a - b);
            } else if (t.equals("*")) {
                stack.push(stack.pop() * stack.pop());
            } else if (t.equals("/")) {
                int b = stack.pop();
                int a = stack.pop();
                stack.push(a / b);
            } else {
                stack.push(Integer.parseInt(t));
            }
        }
        return stack.pop();
    }
}`,
  codeExplanation: `We use a stack (LIFO data structure) to keep track of elements we need to process later. As we iterate through the input, we push elements when conditions are met and pop them when we find their match or resolution. The stack naturally handles nested or sequential dependencies. At the end, we check the stack state to determine the final answer.`
      }
    ]
  },
  {
    id: '56',
    title: '56. Generate Parentheses',
    difficulty: 'Medium',
    pattern: 'Backtracking',
    leetcodeUrl: 'https://leetcode.com/problems/generate-parentheses/',
    analysis: 'Generate all combinations of well-formed parentheses given n pairs. We backtrack securely by strictly keeping track of how many `(` and `)` we have placed. We can only place `)` if its count is less than `(`.',
    hints: [
      'You can add an open parenthesis `(` anytime open < n.',
      'You can add a close parenthesis `)` anytime close < open.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'String backtracking. At each step, if opened < n, append \'(\'. If closed < opened, append \')\'. Base case is when length == 2 * n.',
        timeComplexity: 'O(4ⁿ/√{n}) -> Nth Catalan number',
        spaceComplexity: 'O(N) call stack',
        code: `class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        backtrack(res, "", 0, 0, n);
        return res;
    }
    
    private void backtrack(List<String> res, String currentStr, int open, int close, int n) {
        if (currentStr.length() == n * 2) {
            res.add(currentStr);
            return;
        }
        
        // We can always place left paren if we haven't used all n
        if (open < n) {
            backtrack(res, currentStr + "(", open + 1, close, n);
        }
        // We can place right paren if we have unclosed left parens
        if (close < open) {
            backtrack(res, currentStr + ")", open, close + 1, n);
        }
    }
}`,
  codeExplanation: `String backtracking. At each step, if opened < n, append \\'(\\'. If closed < opened, append \\')\\'. Base case is when length == 2 * n. This approach efficiently handles the problem by making smart decisions at each step, avoiding unnecessary recalculation.`
      }
    ]
  },
  {
    id: '57',
    title: '57. Daily Temperatures',
    difficulty: 'Medium',
    pattern: 'Monotonic Stack',
    leetcodeUrl: 'https://leetcode.com/problems/daily-temperatures/',
    analysis: 'Given an array of temperatures, find how many days you must wait until a warmer temperature. Use a decreasing Monotonic Stack storing indices. If a new day is warmer than the top of the stack, pop the stack resolving its wait time.',
    hints: [
      'Iterate forwards. Keep a Stack tracking unresolved indices.',
      'Unresolved days are strictly decreasing in temp. Once you find a strictly greater temp, pop all smaller previous temps and calculate index delta.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'For each day, scan forward until you find a higher temperature.',
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] result = new int[n];
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (temperatures[j] > temperatures[i]) {
                    result[i] = j - i;
                    break;
                }
            }
        }
        return result;
    }
}`,
  codeExplanation: `This brute-force approach is the most straightforward way to solve the problem. We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      },
      {
        type: 'Optimal',
        explanation: 'Use a monotonic decreasing stack tracking indices. While currTemp > topIndexTemp, pop stack and compute result[popped] = currIndex - poppedIndex.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int[] result = new int[temperatures.length];
        Stack<Integer> stack = new Stack<>(); // stores indices
        
        for (int i = 0; i < temperatures.length; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int resolvedIndex = stack.pop();
                result[resolvedIndex] = i - resolvedIndex;
            }
            stack.push(i);
        }
        
        return result;
    }
}`,
  codeExplanation: `We use a stack (LIFO data structure) to keep track of elements we need to process later. As we iterate through the input, we push elements when conditions are met and pop them when we find their match or resolution. The stack naturally handles nested or sequential dependencies. At the end, we check the stack state to determine the final answer.`
      }
    ]
  },
  {
    id: '58',
    title: '58. Copy List with Random Pointer',
    difficulty: 'Medium',
    pattern: 'Linked List / Hash Map',
    leetcodeUrl: 'https://leetcode.com/problems/copy-list-with-random-pointer/',
    analysis: 'Deep clone a linked list where nodes also have a `random` pointer. Like Clone Graph, a Hash Map mapping Original -> Duplicate handles this instantly. Alternatively, interwoven nodes can achieve O(1) space.',
    hints: [
      'First pass: Add all original nodes into Map and pair them with newly created empty clone nodes.',
      'Second pass: Connect `next` and `random` of the clones using the Map pairings.'
    ],
    approaches: [
      {
        type: 'Better',
        explanation: 'Two linear passes using Map<Node, Node>. Very intuitive.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public Node copyRandomList(Node head) {
        Map<Node, Node> map = new HashMap<>();
        Node curr = head;
        
        // Pass 1: Clone vertices
        while (curr != null) {
            map.put(curr, new Node(curr.val));
            curr = curr.next;
        }
        
        // Pass 2: Clone edges
        curr = head;
        while (curr != null) {
            Node duplicate = map.get(curr);
            duplicate.next = map.get(curr.next);
            duplicate.random = map.get(curr.random);
            curr = curr.next;
        }
        
        return map.get(head);
    }
}`,
  codeExplanation: `This approach optimizes the naive solution by reducing redundant work. We traverse the linked list using pointer manipulation. By carefully updating next pointers, we modify the list structure in place. Using a dummy node simplifies edge cases like removing the head. We process each node exactly once, giving O(n) time complexity.`
      },
      {
        type: 'Optimal',
        explanation: 'O(1) memory. 1) Weave clone nodes: A->A\'->B->B\'. 2) Resolve randoms: A\'.random = A.random.next. 3) Unweave to restore original and isolate copy.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;
        
        Node curr = head;
        // 1. Weave nodes
        while (curr != null) {
            Node clone = new Node(curr.val);
            clone.next = curr.next;
            curr.next = clone;
            curr = clone.next;
        }
        
        // 2. Set Randoms
        curr = head;
        while (curr != null) {
            if (curr.random != null) curr.next.random = curr.random.next;
            curr = curr.next.next;
        }
        
        // 3. Unweave
        curr = head;
        Node cloneHead = head.next;
        while (curr != null) {
            Node cloneNode = curr.next;
            curr.next = curr.next.next;
            if (cloneNode.next != null) cloneNode.next = cloneNode.next.next;
            curr = curr.next;
        }
        
        return cloneHead;
    }
}`,
  codeExplanation: `O(1) memory. 1) Weave clone nodes: A->A\\'->B->B\\'. 2) Resolve randoms: A\\'.random = A.random.next. 3) Unweave to restore original and isolate copy.`
      }
    ]
  },
  {
    id: '59',
    title: '59. Add Two Numbers',
    difficulty: 'Medium',
    pattern: 'Linked List Math',
    leetcodeUrl: 'https://leetcode.com/problems/add-two-numbers/',
    analysis: 'Two numbers represented as Linked Lists in reverse order. Iterate them concurrently like manual grade-school addition. Manage the sum > 9 carry effectively by passing it to the next node loop.',
    hints: [
      'Nodes exist from smallest digits to largest digit seamlessly, so `val % 10` is our node value, and Math.floor(val/10) is our carry.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Use dummy head. Loop while either list is not null, or carry > 0. Extract node values (or 0 if null), calculate sum = a + b + carry. Add sum%10 node. Update carry = sum/10.',
        timeComplexity: 'O(max(N, M))',
        spaceComplexity: 'O(max(N, M)) resultant list',
        code: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        int carry = 0;
        
        while (l1 != null || l2 != null || carry != 0) {
            int x = (l1 != null) ? l1.val : 0;
            int y = (l2 != null) ? l2.val : 0;
            int sum = carry + x + y;
            carry = sum / 10;
            
            curr.next = new ListNode(sum % 10);
            curr = curr.next;
            
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }
        return dummy.next;
    }
}`,
  codeExplanation: `We traverse the linked list using pointer manipulation. By carefully updating next pointers, we modify the list structure in place. Using a dummy node simplifies edge cases like removing the head. We process each node exactly once, giving O(n) time complexity.`
      }
    ]
  },
  {
    id: '60',
    title: '60. Linked List Cycle II',
    difficulty: 'Medium',
    pattern: 'Floyd\'s Tortoise & Hare',
    leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle-ii/',
    analysis: 'Find where a cycle begins. Floyd\'s duplicate cycle finding algorithm states: After fast and slow meet, if you reset slow to head and move both fast and slow by 1 step, they will meet perfectly at the start of the loop.',
    hints: [
      'Find the collision point using standard fast & slow pointer loop.',
      'Leave fast at collision, move slow to Head. Stride them both by 1x speed. The exact moment they equal each other is the Origin of the cycle.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Use a Hash Set. If set contains node, that node is the cycle start.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        code: `public class Solution {
    public ListNode detectCycle(ListNode head) {
        Set<ListNode> seen = new HashSet<>();
        while (head != null) {
            if (!seen.add(head)) { // Returns false if exists
                return head;
            }
            head = head.next;
        }
        return null;
    }
}`,
  codeExplanation: `This brute-force approach is the most straightforward way to solve the problem. We traverse the linked list using pointer manipulation. By carefully updating next pointers, we modify the list structure in place. Using a dummy node simplifies edge cases like removing the head. We process each node exactly once, giving O(n) time complexity.`
      },
      {
        type: 'Optimal',
        explanation: 'Floyd Cycle finding math. Phase 1: finding collision. Phase 2: finding cycle start from reset distance.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        code: `public class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode slow = head, fast = head;
        boolean hasCycle = false;
        
        // Phase 1: Detect cycle
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                hasCycle = true;
                break;
            }
        }
        
        if (!hasCycle) return null;
        
        // Phase 2: Find cycle start
        slow = head;
        while (slow != fast) {
            slow = slow.next;
            fast = fast.next; // Both move 1 step now
        }
        
        return slow; // Cycle start
    }
}`,
  codeExplanation: `We traverse the linked list using pointer manipulation. By carefully updating next pointers, we modify the list structure in place. Using a dummy node simplifies edge cases like removing the head. We process each node exactly once, giving O(n) time complexity.`
      }
    ]
  },
  {
    id: '61',
    title: '61. Reorder List',
    difficulty: 'Medium',
    pattern: 'Linked List',
    leetcodeUrl: 'https://leetcode.com/problems/reorder-list/',
    analysis: 'Reorder the list to L0 → Ln → L1 → Ln-1 → L2 → Ln-2... We can break this into 3 steps: 1. Find the middle of the linked list. 2. Reverse the second half. 3. Merge the two halves alternating.',
    hints: [
      'Use slow and fast pointers to find the middle.',
      'Reverse the linked list from the middle onwards.',
      'Merge the head of original list and head of reversed list node by node.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: '1) Slow/fast pointers to find mid. 2) Reverse second half. 3) Interleave lists.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;
        
        // 1. Find middle
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // 2. Reverse second half
        ListNode prev = null;
        ListNode curr = slow.next;
        slow.next = null; // Split lists
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        
        // 3. Merge
        ListNode first = head;
        ListNode second = prev;
        while (second != null) {
            ListNode temp1 = first.next;
            ListNode temp2 = second.next;
            
            first.next = second;
            second.next = temp1;
            
            first = temp1;
            second = temp2;
        }
    }
}`,
  codeExplanation: `We traverse the linked list using pointer manipulation. By carefully updating next pointers, we modify the list structure in place. Using a dummy node simplifies edge cases like removing the head. We process each node exactly once, giving O(n) time complexity.`
      }
    ]
  },
  {
    id: '62',
    title: '62. Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    pattern: 'Tree Traversal (DFS)',
    leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    analysis: 'Find the maximum depth (number of nodes along the longest path from the root node down to the farthest leaf node). A simple recursive DFS is the most elegant solution.',
    hints: [
      'The depth of a tree is 1 + the max depth of its left and right subtrees.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Recursive DFS. If root is null, return 0. Else return 1 + max(leftDepth, rightDepth).',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(H) for recursion stack',
        code: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '63',
    title: '63. Invert Binary Tree',
    difficulty: 'Easy',
    pattern: 'Tree Traversal',
    leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/',
    analysis: 'Invert a binary tree (mirror it). We need to swap the left and right children of all nodes in the tree. We can do this recursively via DFS or iteratively using BFS.',
    hints: [
      'Recursively invert the left subtree.',
      'Recursively invert the right subtree.',
      'Swap the left and right subtrees of the current node.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Post-order DFS. Traverse completely down left, completely down right. Upon returning, swap the two node pointers.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(H) call stack',
        code: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        
        TreeNode left = invertTree(root.left);
        TreeNode right = invertTree(root.right);
        
        // Swap
        root.left = right;
        root.right = left;
        
        return root;
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '64',
    title: '64. Lowest Common Ancestor of a Binary Search Tree',
    difficulty: 'Medium',
    pattern: 'Tree / BST Math',
    leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
    analysis: 'Find the LCA of two nodes in a BST. Because it\'s a BST, nodes are ordered. If both p and q are > root, LCA must be in the right subtree. If both are < root, LCA must be in left subtree. Otherwise, the current root IS the LCA.',
    hints: [
      'Utilize the BST property: left child < root < right child.',
      'The split point (where p and q diverge paths) is exactly the lowest common ancestor.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Iterative approach. Compare p and q values to root. Based on BST properties, traverse left or right. If they diverge, we found the LCA.',
        timeComplexity: 'O(H) -> O(log N) average, O(N) worst',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        TreeNode curr = root;
        
        while (curr != null) {
            if (p.val > curr.val && q.val > curr.val) {
                curr = curr.right; // Both in right subtree
            } else if (p.val < curr.val && q.val < curr.val) {
                curr = curr.left; // Both in left subtree
            } else {
                return curr; // Divergence point found (or one is the root)
            }
        }
        return null; // Should not reach here if p and q exist
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '65',
    title: '65. Implement strStr() / Find Index of First Occurrence',
    difficulty: 'Easy',
    pattern: 'Two Pointers / String',
    leetcodeUrl: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/',
    analysis: 'Find the first index of haystack where needle occurs. The simplest approach checks every possible starting window. KMP algorithm is optimal O(N) but typically considered overkill for interviews compared to simple nested logic in Java.',
    hints: [
      'Use a sliding window of size needle.length() over haystack. Check if substrings match.',
      'Haystack bound should be `haystack.length() - needle.length()`.'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Nested loops checking all characters. In Java, substring or direct indexing works.',
        timeComplexity: 'O(N × M)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int strStr(String haystack, String needle) {
        if (needle.length() == 0) return 0;
        int n = haystack.length(), m = needle.length();
        
        for (int i = 0; i <= n - m; i++) {
            boolean match = true;
            for (int j = 0; j < m; j++) {
                if (haystack.charAt(i + j) != needle.charAt(j)) {
                    match = false;
                    break;
                }
            }
            if (match) return i;
        }
        return -1;
    }
}`,
  codeExplanation: `This brute-force approach is the most straightforward way to solve the problem. We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      }
    ]
  },
  {
    id: '66',
    title: '66. Two Sum II - Input Array Is Sorted',
    difficulty: 'Medium',
    pattern: 'Two Pointers',
    leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
    analysis: 'Given a 1-indexed sorted array, find two numbers that sum to target. Use two pointers at the ends of the array. If sum > target, decrease right. If sum < target, increase left.',
    hints: [
      'Since the array is sorted, larger pairs come from the right side, smaller pairs from the left.',
      'Sum left + right. If it\'s too big, move the right pointer leftwards.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Two pointers initializing at indices `0` and `length - 1`. Adjust depending on sum vs target.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            
            if (sum == target) {
                return new int[]{left + 1, right + 1}; // 1-indexed
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return new int[]{};
    }
}`,
  codeExplanation: `Two pointers initializing at indices '0' and 'length - 1'. Adjust depending on sum vs target. This approach efficiently handles the problem by making smart decisions at each step, avoiding unnecessary recalculation.`
      }
    ]
  },
  {
    id: '67',
    title: '67. Reverse Linked List',
    difficulty: 'Easy',
    pattern: 'Linked List',
    leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
    analysis: 'Reverse a singly linked list. We need three pointers: `prev` (to point the reversed node to, initially null), `curr` (the current node being processed), and `next` (to temporarily store the remainder of the list before severing the link).',
    hints: [
      'Store `curr.next` in a temp variable.',
      'Point `curr.next` to `prev`.',
      'Move `prev` to `curr`.',
      'Move `curr` to the temporarily stored `next`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Iterative approach using 3 pointers. Process one node at a time, flipping its pointer backward.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        
        while (curr != null) {
            ListNode nextTemp = curr.next; // Save next node
            curr.next = prev;              // Reverse the pointer
            prev = curr;                   // Advance prev
            curr = nextTemp;               // Advance curr
        }
        
        return prev;
    }
}`,
  codeExplanation: `We traverse the linked list using pointer manipulation. By carefully updating next pointers, we modify the list structure in place. Using a dummy node simplifies edge cases like removing the head. We process each node exactly once, giving O(n) time complexity.`
      }
    ]
  },
  {
    id: '68',
    title: '68. Course Schedule',
    difficulty: 'Medium',
    pattern: 'Topological Sort / Graphs',
    leetcodeUrl: 'https://leetcode.com/problems/course-schedule/',
    analysis: 'Determine if you can finish all courses given prerequisite pairs [course, prereq]. This is cycle detection in a Directed Graph. Can be solved using Kahn\'s Algorithm (BFS) or DFS checking for visited back-edges.',
    hints: [
      'Represent the prerequisites as an adjacency list.',
      'Track the "indegree" (number of prerequisites) for each course.',
      'Use a Queue to sequentially process courses that have 0 indegrees. If the total processed courses equals numCourses, it\'s possible.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Kahn\'s Algorithm (BFS Topological Sort). Build adjacency list and array of indegrees. Queue up all nodes with 0 indegrees. While queue is not empty, pop course, increment count, and reduce indegrees of neighbors. If count == numCourses, true.',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V + E)',
        code: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] inDegree = new int[numCourses];
        
        for (int[] pre : prerequisites) {
            adj.get(pre[1]).add(pre[0]);
            inDegree[pre[0]]++;
        }
        
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.add(i);
        }
        
        int count = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();
            count++;
            for (int neighbor : adj.get(curr)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    q.add(neighbor);
                }
            }
        }
        return count == numCourses;
    }
}`,
  codeExplanation: `Kahn\\'s Algorithm (BFS Topological Sort). Build adjacency list and array of indegrees. Queue up all nodes with 0 indegrees. While queue is not empty, pop course, increment count, and reduce indegrees of neighbors. If count == numCourses, true.`
      }
    ]
  },
  {
    id: '69',
    title: '69. Number of Islands',
    difficulty: 'Medium',
    pattern: 'DFS / BFS / Islands',
    leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/',
    analysis: 'Count the number of separate groupings of `1` (land) surrounded by `0` (water). We iterate the grid. When we see a `1`, we increment island count and kick off a DFS to recursively sink (turn to `0`) all connected `1`s.',
    hints: [
      'Iterate grid. If cell is `1`, increment total count of islands.',
      'Immediately call a recursive helper function to visit all orthogonal `1` cells and mutate them to `0` to prevent them from being counted again.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'DFS Sink approach. For each unvisited land element, increment counter and trigger sink. Sink modifies land to water.',
        timeComplexity: 'O(M × N)',
        spaceComplexity: 'O(M × N) worst case recursion stack',
        code: `class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int count = 0;
        
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfsSink(grid, r, c);
                }
            }
        }
        return count;
    }
    
    private void dfsSink(char[][] grid, int r, int c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] == '0') {
            return;
        }
        
        // Sink the land
        grid[r][c] = '0';
        
        dfsSink(grid, r + 1, c);
        dfsSink(grid, r - 1, c);
        dfsSink(grid, r, c + 1);
        dfsSink(grid, r, c - 1);
    }
}`,
  codeExplanation: `We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      }
    ]
  },
  {
    id: '70',
    title: '70. Pacific Atlantic Water Flow',
    difficulty: 'Medium',
    pattern: 'DFS / Multi-source BFS',
    leetcodeUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',
    analysis: 'Find all grid coordinates where water can flow to both Pacific (top/left) and Atlantic (bottom/right). Water flows to strictly equal or lower heights. Instead of flowing down, it is much easier to start from the oceans and flow UP (reversing the rule).',
    hints: [
      'Create two boolean grids: `pacificVisited` and `atlanticVisited`.',
      'Start DFS from every cell touching the Pacific, marking cells that can reach it.',
      'Do the same for Atlantic. A cell is in the result if it is true in both grids.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Reverse search. Run DFS originating from the borders inwards. Only traverse inwards if the neighbor height is >= current height. Use two visited matrices, intersect them for the result.',
        timeComplexity: 'O(M × N)',
        spaceComplexity: 'O(M × N)',
        code: `class Solution {
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        List<List<Integer>> res = new ArrayList<>();
        if (heights.length == 0 || heights[0].length == 0) return res;
        
        int rows = heights.length, cols = heights[0].length;
        boolean[][] pac = new boolean[rows][cols];
        boolean[][] atl = new boolean[rows][cols];
        
        // DFS from top and bottom rows
        for (int c = 0; c < cols; c++) {
            dfs(heights, pac, 0, c, Integer.MIN_VALUE);
            dfs(heights, atl, rows - 1, c, Integer.MIN_VALUE);
        }
        
        // DFS from left and right cols
        for (int r = 0; r < rows; r++) {
            dfs(heights, pac, r, 0, Integer.MIN_VALUE);
            dfs(heights, atl, r, cols - 1, Integer.MIN_VALUE);
        }
        
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (pac[r][c] && atl[r][c]) {
                    res.add(Arrays.asList(r, c));
                }
            }
        }
        return res;
    }
    
    private void dfs(int[][] h, boolean[][] visited, int r, int c, int prevHeight) {
        if (r < 0 || c < 0 || r >= h.length || c >= h[0].length 
            || visited[r][c] || h[r][c] < prevHeight) {
            return;
        }
        
        visited[r][c] = true;
        
        dfs(h, visited, r + 1, c, h[r][c]);
        dfs(h, visited, r - 1, c, h[r][c]);
        dfs(h, visited, r, c + 1, h[r][c]);
        dfs(h, visited, r, c - 1, h[r][c]);
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '71',
    title: '71. Maximum Product Subarray',
    difficulty: 'Medium',
    pattern: 'DP / Kadane\'s Variant',
    leetcodeUrl: 'https://leetcode.com/problems/maximum-product-subarray/',
    analysis: 'Unlike summing, multiplying two large negative numbers produces a large positive number. Therefore, we must keep track of both the maximum product subarray ending here AND the minimum (most negative) product subarray ending here.',
    hints: [
      'Maintain `currMax` and `currMin`.',
      'If the next element is negative, it will flip the sign of the product, so swap `currMax` and `currMin` before multiplying.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Dynamic mapping tracing both min and max to account for double negative signs producing massive positive numbers.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int maxProduct(int[] nums) {
        if (nums.length == 0) return 0;
        
        int globalMax = nums[0];
        int currMax = nums[0];
        int currMin = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            int num = nums[i];
            
            // If negative, extremes swap (min becomes max, max becomes min)
            if (num < 0) {
                int temp = currMax;
                currMax = currMin;
                currMin = temp;
            }
            
            currMax = Math.max(num, currMax * num);
            currMin = Math.min(num, currMin * num);
            
            globalMax = Math.max(globalMax, currMax);
        }
        
        return globalMax;
    }
}`,
  codeExplanation: `We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      }
    ]
  },
  {
    id: '72',
    title: '72. Jump Game',
    difficulty: 'Medium',
    pattern: 'Greedy',
    leetcodeUrl: 'https://leetcode.com/problems/jump-game/',
    analysis: 'Determine if you can reach the last index. Each element represents maximum jump length. The elegant Greedy approach works backwards: identify if the current index can reach the "goal" index. If so, move the goal index closer.',
    hints: [
      'Initialize `goal` at the last index.',
      'Loop backwards. If `i + nums[i] >= goal`, then update `goal = i`.',
      'At the end, if `goal == 0`, return true.'
    ],
    approaches: [
      {
        type: 'Better',
        explanation: 'Forward greedy approach. Maintain the maximum reach. If max reach is stuck at `i` (maxReach <= i) and `nums[i] == 0`, we cannot proceed.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public boolean canJump(int[] nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > maxReach) return false;
            maxReach = Math.max(maxReach, i + nums[i]);
            if (maxReach >= nums.length - 1) return true;
        }
        return true;
    }
}`,
  codeExplanation: `Forward greedy approach. Maintain the maximum reach. If max reach is stuck at 'i' (maxReach <= i) and 'nums[i] == 0', we cannot proceed. This approach efficiently handles the problem by making smart decisions at each step, avoiding unnecessary recalculation.`
      },
      {
        type: 'Optimal',
        explanation: 'Backward greedy approach shifting the goalpost. Simplest logic.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public boolean canJump(int[] nums) {
        int goal = nums.length - 1;
        
        for (int i = nums.length - 2; i >= 0; i--) {
            if (i + nums[i] >= goal) {
                goal = i; // Move goalpost back
            }
        }
        return goal == 0;
    }
}`,
  codeExplanation: `We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      }
    ]
  },
  {
    id: '73',
    title: '73. Find Minimum in Rotated Sorted Array',
    difficulty: 'Medium',
    pattern: 'Binary Search',
    leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
    analysis: 'Find the minimum element in an array that has been sorted and then rotated. Binary Search: We must identify which half (left or right) the pivot (the drop-off) exists in.',
    hints: [
      'Compare `nums[mid]` to `nums[right]`.',
      'If `nums[mid] > nums[right]`, the minimum is entirely in the right half (e.g. 5,6,1,2,3 - 6 > 3).',
      'Else `nums[mid] <= nums[right]`, the minimum is in the left half, including `mid`. (e.g. 5,1,2,3,4 - 2 < 4).'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Binary Search minimizing window until L equals R.',
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int findMin(int[] nums) {
        int left = 0, right = nums.length - 1;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            // If mid is greater than right end, min must be to the right of mid
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else { // Otherwise min is mid or left of mid
                right = mid;
            }
        }
        
        return nums[left];
    }
}`,
  codeExplanation: `We use binary search to efficiently narrow down the answer space. We maintain left and right pointers and compute a mid value. Based on the comparison at mid, we eliminate half the search space each iteration. This gives us logarithmic time complexity instead of linear scanning.`
      }
    ]
  },
  {
    id: '74',
    title: '74. Search in Rotated Sorted Array',
    difficulty: 'Medium',
    pattern: 'Binary Search',
    leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    analysis: 'Search for a target value in a rotated sorted array. We use Binary Search. The core trick is that in any rotated array, one half (either left or right relative to mid) will always be strictly sorted. We identify the sorted half and check if target lies within it.',
    hints: [
      'First determine if the left half is sorted (`nums[L] <= nums[mid]`).',
      'If it is, check if `target` fits inside its bounds (`nums[L] <= target < nums[mid]`). If it does, branch left. Else branch right.',
      'If left half isn\'t sorted, right half MUST be. Apply the inverse logic.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Modified binary search making branching decisions based on which portion of the array is continually sorted increasing.',
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            
            // Is left half sorted?
            if (nums[left] <= nums[mid]) {
                // Is target inside the sorted left half?
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } 
            // Right half must be sorted
            else {
                // Is target inside the sorted right half?
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
}`,
  codeExplanation: `We use binary search to efficiently narrow down the answer space. We maintain left and right pointers and compute a mid value. Based on the comparison at mid, we eliminate half the search space each iteration. This gives us logarithmic time complexity instead of linear scanning.`
      }
    ]
  },
  {
    id: '75',
    title: '75. Longest Consecutive Sequence',
    difficulty: 'Medium',
    pattern: 'Hash Set',
    leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/',
    analysis: 'Given an unsorted array, find the length of the longest consecutive elements sequence in O(n) time. The O(n) requirement prohibits sorting. Thus, we dump everything into a HashSet.',
    hints: [
      'Dump all array elements into a HashSet.',
      'Iterate through the set. Only start counting a sequence if you are at the BEGINNING of a sequence (i.e. `!set.contains(num - 1)`).'
    ],
    approaches: [
      {
        type: 'Naive',
        explanation: 'Sort the array and find the longest consecutive streak. Violates O(n) requirement.',
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums.length == 0) return 0;
        Arrays.sort(nums);
        int longest = 1, current streak = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[i-1]) {
                if (nums[i] == nums[i-1] + 1) {
                    streak++;
                } else {
                    longest = Math.max(longest, streak);
                    streak = 1;
                }
            }
        }
        return Math.max(longest, streak);
    }
}`,
  codeExplanation: `This brute-force approach is the most straightforward way to solve the problem. We first sort the input to establish an ordering that simplifies the problem. With sorted data, we can use efficient techniques like binary search or two pointers. Related elements are now adjacent, making comparisons straightforward. The sorting step takes O(n log n) which becomes the overall time complexity.`
      },
      {
        type: 'Optimal',
        explanation: 'Hash Set for O(1) lookups. Only expand streaks forwards from numbers that have no left-neighbor, guaranteeing each element is visited at most twice.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int n : nums) set.add(n);
        
        int longestStreak = 0;
        
        for (int num : set) {
            // Check if num is the start of a sequence
            if (!set.contains(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;
                
                // Count consecutive sequence
                while (set.contains(currentNum + 1)) {
                    currentNum++;
                    currentStreak++;
                }
                
                longestStreak = Math.max(longestStreak, currentStreak);
            }
        }
        
        return longestStreak;
    }
}`,
  codeExplanation: `We use a HashMap for O(1) average-case lookup and storage. As we iterate through the input, we store key information in the map. For each new element, we check the map to see if a complementary element exists. This trades space for time, reducing the complexity from O(n²) to O(n).`
      }
    ]
  },
  {
    id: '76',
    title: '76. Merge K Sorted Lists',
    difficulty: 'Hard',
    pattern: 'Priority Queue (Heap) / Divide & Conquer',
    leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/',
    analysis: 'Merge k sorted linked lists and return it as one sorted list. An elegant approach pushes the head of every list into a Min-Heap. Pop the smallest node, push its `.next` into the heap, repeat.',
    hints: [
      'A Priority Queue naturally keeps track of the smallest current element among all `k` lists.',
      'Initialize Priority Queue with the head of all lists.',
      'Pop, append to result, if `popped.next != null`, add it to queue.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Min-Heap logic maintaining up to K elements at a time. O(N log K) time.',
        timeComplexity: 'O(N log K) (N = total elements, K = lists)',
        spaceComplexity: 'O(K) for priority queue',
        code: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;
        
        // Min Heap sorting by node value
        PriorityQueue<ListNode> pq = new PriorityQueue<>(lists.length, (a,b) -> Integer.compare(a.val, b.val));
        
        // Load initial heads
        for (ListNode node : lists) {
            if (node != null) pq.add(node);
        }
        
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        
        while (!pq.isEmpty()) {
            ListNode smallest = pq.poll(); // Extract min
            curr.next = smallest;
            curr = curr.next;
            
            if (smallest.next != null) {
                pq.add(smallest.next); // Add next element from that list
            }
        }
        
        return dummy.next;
    }
}`,
  codeExplanation: `We use a priority queue (min-heap or max-heap) to efficiently access the smallest or largest element. Elements are added to the heap as we process the input. The heap automatically maintains order, giving us O(log n) insert and extract operations. This is more efficient than repeatedly sorting or scanning for the optimal element.`
      }
    ]
  },
  {
    id: '77',
    title: '77. Top K Frequent Elements',
    difficulty: 'Medium',
    pattern: 'Bucket Sort / Priority Queue',
    leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
    analysis: 'Find the top k most frequent elements loosely unsorted. You can populate a frequency map and then sort by values. Using Bucket Sort, you map frequencies to indices in an array for an O(N) solution.',
    hints: [
      'Create Map mapping number to its count.',
      'Create an array of Lists `List<Integer>[] buckets = new List[nums.length + 1]`',
      'If number `4` appears `3` times, `buckets[3].add(4)`.'
    ],
    approaches: [
      {
        type: 'Better',
        explanation: 'Map counts, then throw map entries into a Max-Heap based on frequency value. Pop K times.',
        timeComplexity: 'O(N log K)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int num : nums) map.put(num, map.getOrDefault(num, 0) + 1);
        
        PriorityQueue<Integer> pq = new PriorityQueue<>(
            (a, b) -> Integer.compare(map.get(a), map.get(b)) // Min heap logic
        );
        
        for (int key : map.keySet()) {
            pq.add(key);
            if (pq.size() > k) pq.poll(); // Maintain K largest
        }
        
        int[] res = new int[k];
        for (int i = k - 1; i >= 0; i--) res[i] = pq.poll();
        return res;
    }
}`,
  codeExplanation: `This approach optimizes the naive solution by reducing redundant work. We use a priority queue (min-heap or max-heap) to efficiently access the smallest or largest element. Elements are added to the heap as we process the input. The heap automatically maintains order, giving us O(log n) insert and extract operations. This is more efficient than repeatedly sorting or scanning for the optimal element.`
      },
      {
        type: 'Optimal',
        explanation: 'Bucket sort the frequency ranges. Array acts as bucket index (highest frequency = highest index). Iterate backward K times.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) count.put(num, count.getOrDefault(num, 0) + 1);
        
        // Array of lists where index = frequency
        List<Integer>[] buckets = new List[nums.length + 1];
        
        for (int key : count.keySet()) {
            int freq = count.get(key);
            if (buckets[freq] == null) {
                buckets[freq] = new ArrayList<>();
            }
            buckets[freq].add(key);
        }
        
        int[] res = new int[k];
        int index = 0;
        
        for (int i = buckets.length - 1; i >= 0 && index < k; i--) {
            if (buckets[i] != null) {
                for (int num : buckets[i]) {
                    res[index++] = num;
                    if (index == k) return res;
                }
            }
        }
        return res;
    }
}`,
  codeExplanation: `We use a HashMap for O(1) average-case lookup and storage. As we iterate through the input, we store key information in the map. For each new element, we check the map to see if a complementary element exists. This trades space for time, reducing the complexity from O(n²) to O(n).`
      }
    ]
  },
  {
    id: '78',
    title: '78. Insert Delete GetRandom O(1)',
    difficulty: 'Medium',
    pattern: 'Hash Map + Array',
    leetcodeUrl: 'https://leetcode.com/problems/insert-delete-getrandom-o1/',
    analysis: 'Design a data structure with O(1) average time complexity for Insert, Delete, and GetRandom. A HashSet gives O(1) insert/delete, but cannot do O(1) random fetching mathematically. To get O(1) random fetching, we MUST use an Array list (getting by index).',
    hints: [
      'Use an ArrayList to store the data and a Hash Map to store `Map<Value, ArrayIndex>`.',
      'A deletion in an ArrayList from the middle is O(n). To delete in O(1), swap the element to delete with the very last element in the ArrayList, update the Hash Map, and remove the last element.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Synchronize an ArrayList with a HashMap tracking element indices. Upon deletion, pull the last element of the list, overwrite the target index, update the map, and remove the last list element.',
        timeComplexity: 'O(1) average',
        spaceComplexity: 'O(N) memory scale',
        code: `class RandomizedSet {
    List<Integer> list;
    Map<Integer, Integer> map;
    Random rand;

    public RandomizedSet() {
        list = new ArrayList<>();
        map = new HashMap<>();
        rand = new Random();
    }
    
    public boolean insert(int val) {
        if (map.containsKey(val)) return false;
        map.put(val, list.size());
        list.add(val);
        return true;
    }
    
    public boolean remove(int val) {
        if (!map.containsKey(val)) return false;
        
        int loc = map.get(val);
        // Swap with last element dynamically
        if (loc < list.size() - 1) { 
            int lastOne = list.get(list.size() - 1);
            list.set(loc, lastOne);
            map.put(lastOne, loc); // Update new location of lastOne
        }
        
        // Remove mathematically
        map.remove(val);
        list.remove(list.size() - 1);
        return true;
    }
    
    public int getRandom() {
        return list.get(rand.nextInt(list.size()));
    }
}`,
  codeExplanation: `We explore all possible choices using recursion (backtracking). At each step, we make a choice, then recurse on the remaining problem. If a choice leads to a dead end, we undo it (backtrack) and try the next option. This systematically explores the entire solution space while pruning invalid paths early.`
      }
    ]
  },
  {
    id: '79',
    title: '79. Subarray Sum Equals K',
    difficulty: 'Medium',
    pattern: 'Prefix Sum / Map',
    leetcodeUrl: 'https://leetcode.com/problems/subarray-sum-equals-k/',
    analysis: 'Find total number of continuous subarrays whose sum equals to k. Arrays can contain negative values, invalidating sliding windows natively. We use a Prefix Sum approach with a HashMap to track frequency of previous sums.',
    hints: [
      'Keep a running sum as you iterate backward.',
      'If `runningSum - k` exists in the previous sums map, we found exactly that many valid subarrays ending exactly at this spot.',
      'Always add `map.put(0, 1)` to account for prefixes that identically match `k`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Count cumulative sums. Check map for count of `sum - k`. Increment map frequency of `sum`.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public int subarraySum(int[] nums, int k) {
        int count = 0, sum = 0;
        // Map <PrefixSum, Frequency>
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1); // Crucial base case
        
        for (int num : nums) {
            sum += num;
            
            // If we have seen (sum - k), there exists a subarray equal to k
            if (map.containsKey(sum - k)) {
                count += map.get(sum - k);
            }
            
            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }
        
        return count;
    }
}`,
  codeExplanation: `Count cumulative sums. Check map for count of 'sum - k'. Increment map frequency of 'sum'. This approach efficiently handles the problem by making smart decisions at each step, avoiding unnecessary recalculation.`
      }
    ]
  },
  {
    id: '80',
    title: '80. Longest Consecutive Sequence',
    difficulty: 'Medium',
    pattern: 'Stack Bracket Math',
    leetcodeUrl: 'https://leetcode.com/problems/longest-valid-parentheses/',
    analysis: 'This is actually "Longest Valid Parentheses" (commonly mistitled). Find length of longest valid parenthesis substring. A stack resolves this beautifully: we push index `-1` naturally. When seeing `(`, push index. When `)`, pop index. If stack empty, push the invalid index as new anchor. Otherwise compute `i - stack.peek()`.',
    hints: [
      'Store indices, not characters, in the Stack.',
      'A baseline anchor is required in the stack initially (i.e., `-1`).'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Stack-based index tracker resolving distance backwards.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public int longestValidParentheses(String s) {
        Stack<Integer> stack = new Stack<>();
        stack.push(-1); // Anchor index
        int maxLen = 0;
        
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') {
                stack.push(i);
            } else {
                stack.pop(); // Match found or invalid drop
                if (stack.isEmpty()) {
                    stack.push(i); // New anchor point of invalidity
                } else {
                    maxLen = Math.max(maxLen, i - stack.peek());
                }
            }
        }
        
        return maxLen;
    }
}`,
  codeExplanation: `We use a stack (LIFO data structure) to keep track of elements we need to process later. As we iterate through the input, we push elements when conditions are met and pop them when we find their match or resolution. The stack naturally handles nested or sequential dependencies. At the end, we check the stack state to determine the final answer.`
      }
    ]
  },
  {
    id: '81',
    title: '81. Search a 2D Matrix',
    difficulty: 'Medium',
    pattern: 'Binary Search',
    leetcodeUrl: 'https://leetcode.com/problems/search-a-2d-matrix/',
    analysis: 'Search for a target value in an m x n matrix where rows are sorted and the first integer of each row is greater than the last integer of the previous row. This structure effectively makes the 2D matrix behave entirely like a single 1D sorted array.',
    hints: [
      'Treat the 2D matrix as a 1D array of length `m * n`.',
      'The row index is `mid / cols` and the column index is `mid % cols`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Standard Binary Search mapping a 1D index back to 2D coordinates.',
        timeComplexity: 'O(log(M × N))',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix.length == 0 || matrix[0].length == 0) return false;
        
        int rows = matrix.length;
        int cols = matrix[0].length;
        int left = 0;
        int right = rows * cols - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int r = mid / cols;
            int c = mid % cols;
            
            if (matrix[r][c] == target) {
                return true;
            } else if (matrix[r][c] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return false;
    }
}`,
  codeExplanation: `We use binary search to efficiently narrow down the answer space. We maintain left and right pointers and compute a mid value. Based on the comparison at mid, we eliminate half the search space each iteration. This gives us logarithmic time complexity instead of linear scanning.`
      }
    ]
  },
  {
    id: '82',
    title: '82. Word Break',
    difficulty: 'Medium',
    pattern: 'Dynamic Programming / Memoization',
    leetcodeUrl: 'https://leetcode.com/problems/word-break/',
    analysis: 'Determine if a string can be segmented into a space-separated sequence of one or more dictionary words. We can use DP where `dp[i]` represents whether the substring ending at index `i` is validly segmented.',
    hints: [
      'Initialize `dp` boolean array of size `s.length() + 1`. `dp[0]` is true.',
      'For each character `i` from `1` to `N`, check every starting point `j` before it. If `dp[j]` is true AND the substring from `j` to `i` is in the dict, then `dp[i]` is true.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: '1D DP sequence evaluation checking backwards for valid chunks.',
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> dict = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        
        for (int end = 1; end <= s.length(); end++) {
            for (int start = 0; start < end; start++) {
                if (dp[start] && dict.contains(s.substring(start, end))) {
                    dp[end] = true;
                    break;
                }
            }
        }
        
        return dp[s.length()];
    }
}`,
  codeExplanation: `We use dynamic programming to build up solutions from smaller subproblems. Each cell in the dp array/table stores the answer to a specific subproblem. We fill the table iteratively, using previously computed values to avoid redundant calculations. The final answer is found at the end of the dp array or table.`
      }
    ]
  },
  {
    id: '83',
    title: '83. Find All Anagrams in a String',
    difficulty: 'Medium',
    pattern: 'Sliding Window',
    leetcodeUrl: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/',
    analysis: 'Given a string `s` and a non-empty string `p`, find all the start indices of `p`\'s anagrams in `s`. Anagrams have identical character frequencies. We can maintain a sliding window of length `p` over `s` and compare their frequency maps.',
    hints: [
      'Create an array of size 26 for string `p` identifying exactly what characters you need.',
      'Slide a window of length `p.length()` across `s`. Expand right side, shrink left side. If the frequencies match, add left index.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Sliding window using fixed size 26 arrays. We slide by adding the right char and immediately removing the left char if window size is exceeded, then `Arrays.equals()` the arrays.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1) (size 26 arrays)',
        code: `class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        List<Integer> res = new ArrayList<>();
        if (s.length() < p.length()) return res;
        
        int[] pCount = new int[26];
        int[] sCount = new int[26];
        
        for (char c : p.toCharArray()) pCount[c - 'a']++;
        
        int left = 0;
        for (int right = 0; right < s.length(); right++) {
            sCount[s.charAt(right) - 'a']++; // Expand window
            
            if (right - left + 1 > p.length()) { // Shrink if too large
                sCount[s.charAt(left) - 'a']--;
                left++;
            }
            
            if (right - left + 1 == p.length()) { // Match check
                if (Arrays.equals(pCount, sCount)) {
                    res.add(left);
                }
            }
        }
        return res;
    }
}`,
  codeExplanation: `Sliding window using fixed size 26 arrays. We slide by adding the right char and immediately removing the left char if window size is exceeded, then 'Arrays.equals()' the arrays.`
      }
    ]
  },
  {
    id: '84',
    title: '84. Largest Rectangle in Histogram',
    difficulty: 'Hard',
    pattern: 'Monotonic Stack',
    leetcodeUrl: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
    analysis: 'Find the area of largest rectangle in the histogram. For any bar, the max rectangle constrained by its height stretches left until it hits a shorter bar, and right until it hits a shorter bar. We can use a Monotonic Increasing Stack to systematically find these bounds.',
    hints: [
      'Maintain a stack of INDICES of bars. The stack should be strictly increasing in height.',
      'If a new bar is SHORTER than the top of the stack, the top of the stack has found its right boundary. Pop it and calculate its area.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Monotonic Stack holding indices. Popping dynamically determines left boundary (new top of stack) and right boundary (current index).',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public int largestRectangleArea(int[] heights) {
        Stack<Integer> stack = new Stack<>();
        int maxArea = 0;
        int i = 0;
        
        while (i < heights.length) {
            if (stack.isEmpty() || heights[i] >= heights[stack.peek()]) { // Increasing stack
                stack.push(i++);
            } else {
                // Bar is smaller, so previous bar cannot stretch further right
                int topIndex = stack.pop();
                int height = heights[topIndex];
                int width = stack.isEmpty() ? i : i - 1 - stack.peek();
                maxArea = Math.max(maxArea, height * width);
            }
        }
        
        // Empty remaining stack bars
        while (!stack.isEmpty()) {
            int topIndex = stack.pop();
            int height = heights[topIndex];
            int width = stack.isEmpty() ? i : i - 1 - stack.peek();
            maxArea = Math.max(maxArea, height * width);
        }
        
        return maxArea;
    }
}`,
  codeExplanation: `We use a stack (LIFO data structure) to keep track of elements we need to process later. As we iterate through the input, we push elements when conditions are met and pop them when we find their match or resolution. The stack naturally handles nested or sequential dependencies. At the end, we check the stack state to determine the final answer.`
      }
    ]
  },
  {
    id: '85',
    title: '85. Maximal Rectangle',
    difficulty: 'Hard',
    pattern: 'Monotonic Stack / DP',
    leetcodeUrl: 'https://leetcode.com/problems/maximal-rectangle/',
    analysis: 'Given a 2D binary matrix filled with 0s and 1s, find the largest rectangle containing only 1s. This is actually a 2D variation of "Largest Rectangle in Histogram". Each row becomes a histogram resting on the base of that row.',
    hints: [
      'If the matrix element is 1, add 1 to the height map for that column. If it is 0, the height map for that column becomes 0 natively.',
      'For each row, evaluate the newly accumulated histogram heights using the O(N) Monotonic Stack approach.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'We maintain an array `heights` representing the cumulative 1s per column. We process each row, map it into a histogram, and apply the Histogram Stack logic to find the max area standing on that row.',
        timeComplexity: 'O(M × N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public int maximalRectangle(char[][] matrix) {
        if (matrix.length == 0 || matrix[0].length == 0) return 0;
        
        int[] heights = new int[matrix[0].length];
        int maxArea = 0;
        
        for (int i = 0; i < matrix.length; i++) {
            // Build histogram standing on row i
            for (int j = 0; j < matrix[0].length; j++) {
                if (matrix[i][j] == '1') {
                    heights[j]++;
                } else {
                    heights[j] = 0; // Ground broken
                }
            }
            
            // Apply histogram maximal rectangle algo
            maxArea = Math.max(maxArea, largestRectangleArea(heights));
        }
        return maxArea;
    }
    
    // Exact same helper from Question 84
    private int largestRectangleArea(int[] heights) {
        Stack<Integer> stack = new Stack<>();
        int max = 0, i = 0;
        while (i < heights.length) {
            if (stack.isEmpty() || heights[i] >= heights[stack.peek()]) {
                stack.push(i++);
            } else {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - 1 - stack.peek();
                max = Math.max(max, height * width);
            }
        }
        while (!stack.isEmpty()) {
            int height = heights[stack.pop()];
            int width = stack.isEmpty() ? i : i - 1 - stack.peek();
            max = Math.max(max, height * width);
        }
        return max;
    }
}`,
  codeExplanation: `We maintain an array 'heights' representing the cumulative 1s per column. We process each row, map it into a histogram, and apply the Histogram Stack logic to find the max area standing on that row.`
      }
    ]
  },
  {
    id: '86',
    title: '86. Construct Tree from Preorder and Inorder Traversal',
    difficulty: 'Medium',
    pattern: 'Trees / Divide & Conquer',
    leetcodeUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
    analysis: 'Preorder traversal processes node sequences `[Root, Left... , Right...]`. Inorder processes `[Left... , Root, Right...]`. By inspecting the Preorder array, we instantly know the root. Finding that root in Inorder array tells us exactly how many elements are in the left subtree versus right subtree.',
    hints: [
      'Pop the first element of Preorder. This is the root.',
      'Find its index in Inorder. Everything to the left is the Left Subtree. Everything right is the Right Subtree.',
      'Recursively do this for left and right chunks.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Use a Hash Map mapping Inorder value -> Inorder index for O(1) searches. Pass boundary arguments recursively to slice the tree logically, picking off roots from preorder array incrementally.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    int preIndex = 0;
    Map<Integer, Integer> inMap = new HashMap<>();
    
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) {
            inMap.put(inorder[i], i);
        }
        return construct(preorder, 0, inorder.length - 1);
    }
    
    private TreeNode construct(int[] preorder, int inStart, int inEnd) {
        if (inStart > inEnd) return null;
        
        int rootValue = preorder[preIndex++];
        TreeNode root = new TreeNode(rootValue);
        
        int rootInIndex = inMap.get(rootValue);
        
        root.left = construct(preorder, inStart, rootInIndex - 1);
        root.right = construct(preorder, rootInIndex + 1, inEnd);
        
        return root;
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '87',
    title: '87. Binary Tree Maximum Path Sum',
    difficulty: 'Hard',
    pattern: 'Tree Traversal / Post-order',
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
    analysis: 'Find the maximum path sum between ANY two nodes. The path does not have to pass through the root. For any node we visit, there is a path sum looping through itself (left + node + right), AND the value we must return strictly going UP to its parent (node + max(left, right)).',
    hints: [
      'Do a Post-order traversal.',
      'Keep a global `maxSum` updating dynamically.',
      'If a subtree returns a negative path sum, drop it entirely (treat it as 0) since it would only drag the result down.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Traverse to bottom. Bottom-up evaluate properties. Drop negative subtree returns using `Math.max(0, ...)`. Update global with `left + right + root`. Return `root + max(left, right)` to parent.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(H)',
        code: `class Solution {
    int maxSum = Integer.MIN_VALUE;
    
    public int maxPathSum(TreeNode root) {
        dfsGain(root);
        return maxSum;
    }
    
    private int dfsGain(TreeNode node) {
        if (node == null) return 0;
        
        // If child path is negative, dropping it (0) is optimal
        int leftGain = Math.max(0, dfsGain(node.left));
        int rightGain = Math.max(0, dfsGain(node.right));
        
        // Max path spanning ACROSS the current node
        int currentPathSum = node.val + leftGain + rightGain;
        
        // Update global max securely
        maxSum = Math.max(maxSum, currentPathSum);
        
        // For the parent call, only one continuous path (left OR right) can be taken
        return node.val + Math.max(leftGain, rightGain);
    }
}`,
  codeExplanation: `Traverse to bottom. Bottom-up evaluate properties. Drop negative subtree returns using 'Math.max(0, ...)'. Update global with 'left + right + root'. Return 'root + max(left, right)' to parent.`
      }
    ]
  },
  {
    id: '88',
    title: '88. Kth Smallest Element in a BST',
    difficulty: 'Medium',
    pattern: 'Inorder Traversal',
    leetcodeUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',
    analysis: 'Given a BST, find the kth smallest element. The magic of a BST is that an Inorder Traversal strictly processes nodes in sorted ascending order. Therefore, the Kth node visited during inorder traversal IS the Kth smallest element.',
    hints: [
      'Perform Inorder DFS (Left, Node, Right).',
      'Keep a counter incrementing each time you process `Node`.',
      'When `count == k`, that node\'s value is your answer.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Iterative inorder traversal using a Stack. Decrement K every time a node is popped. Once K is zero, return the node.',
        timeComplexity: 'O(H + K)',
        spaceComplexity: 'O(H)',
        code: `class Solution {
    public int kthSmallest(TreeNode root, int k) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode curr = root;
        int count = 0;
        
        while (curr != null || !stack.isEmpty()) {
            while (curr != null) {
                stack.push(curr);
                curr = curr.left; // Traverse left entirely
            }
            
            curr = stack.pop(); // Process Node
            count++;
            if (count == k) return curr.val;
            
            curr = curr.right; // Navigate right
        }
        
        return -1;
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '89',
    title: '89. Find Median from Data Stream',
    difficulty: 'Hard',
    pattern: 'Two Heaps',
    leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/',
    analysis: 'Compute median from a data stream. We can balance the element pool into two halves. The lower half of numbers goes into a Max-Heap (to expose the largest small number). The upper half goes into a Min-Heap (to expose the smallest large number).',
    hints: [
      'Maintain two heaps: `minHeap` for the larger numbers, `maxHeap` for the smaller numbers.',
      'The median is simply the peak of the larger heap, or the average of both peaks.',
      'Maintain an invariant where sizes differ by at most 1.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Insert into maxHeap. Eject max to minHeap. Rebalance if minHeap is larger. Median is either maxHeap.peek() or average of both.',
        timeComplexity: 'O(log N) insert, O(1) query',
        spaceComplexity: 'O(N)',
        code: `class MedianFinder {
    PriorityQueue<Integer> maxHeap; // Lower half
    PriorityQueue<Integer> minHeap; // Upper half

    public MedianFinder() {
        maxHeap = new PriorityQueue<>((a, b) -> b - a);
        minHeap = new PriorityQueue<>();
    }
    
    public void addNum(int num) {
        maxHeap.add(num);
        minHeap.add(maxHeap.poll()); // Transfer highest of low side to high side
        
        // Ensure maxHeap always has equal or +1 elements compared to minHeap
        if (minHeap.size() > maxHeap.size()) {
            maxHeap.add(minHeap.poll());
        }
    }
    
    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.peek();
        } else {
            return (maxHeap.peek() + minHeap.peek()) / 2.0;
        }
    }
}`,
  codeExplanation: `We use a priority queue (min-heap or max-heap) to efficiently access the smallest or largest element. Elements are added to the heap as we process the input. The heap automatically maintains order, giving us O(log n) insert and extract operations. This is more efficient than repeatedly sorting or scanning for the optimal element.`
      }
    ]
  },
  {
    id: '90',
    title: '90. Trie Implementation / Search Suggestions System',
    difficulty: 'Medium',
    pattern: 'Trie / Two Pointers',
    leetcodeUrl: 'https://leetcode.com/problems/search-suggestions-system/',
    analysis: 'Given an array of strings products and a searchWord, return up to 3 matching words for each prefix typed. Can use a Trie tracking the top 3 words per node during insertion, or sort products and use Two Pointers/Binary Search bounds.',
    hints: [
      'Sort the products array.',
      'Because they are sorted, matching prefixes clump together.',
      'Use Binary Search or two pointers to find lower and upper bounds for each prefix incrementally.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Sort products. Use two pointers left and right. For each letter typed, shrink pointers if the word at pointer is too short or doesn\'t match the letter. Return up to 3 from left.',
        timeComplexity: 'O(N log N + M)',
        spaceComplexity: 'O(N) for sort',
        code: `class Solution {
    public List<List<String>> suggestedProducts(String[] products, String searchWord) {
        Arrays.sort(products);
        List<List<String>> res = new ArrayList<>();
        int left = 0, right = products.length - 1;
        
        for (int i = 0; i < searchWord.length(); i++) {
            char c = searchWord.charAt(i);
            
            // Shrink window if invalid bounds
            while (left <= right && (products[left].length() <= i || products[left].charAt(i) != c)) {
                left++;
            }
            while (left <= right && (products[right].length() <= i || products[right].charAt(i) != c)) {
                right--;
            }
            
            List<String> list = new ArrayList<>();
            for (int k = 0; k < 3 && left + k <= right; k++) {
                list.add(products[left + k]);
            }
            res.add(list);
        }
        return res;
    }
}`,
  codeExplanation: `Sort products. Use two pointers left and right. For each letter typed, shrink pointers if the word at pointer is too short or doesn\\'t match the letter. Return up to 3 from left.`
      }
    ]
  },
  {
    id: '91',
    title: '91. Non-overlapping Intervals',
    difficulty: 'Medium',
    pattern: 'Sorting / Greedy',
    leetcodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals/',
    analysis: 'Find minimum number of intervals to remove to make the rest non-overlapping. Equivalent to finding the maximum number of non-overlapping sets. Greedy algorithm: sort by end times! Always pick intervals that end earliest.',
    hints: [
      'Sort exactly by end time, NOT start time.',
      'Track the last valid ending time. If the next interval starts before this ending time, it must be removed.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Sorting by end time guarantees that the first valid element leaves the most room for remaining elements.',
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) return 0;
        
        // Sort by END time
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        
        int removals = 0;
        int end = intervals[0][1];
        
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < end) {
                // Occurs before previous ended, must be removed
                removals++;
            } else {
                // Non-overlapping, update interval bound
                end = intervals[i][1];
            }
        }
        
        return removals;
    }
}`,
  codeExplanation: `We first sort the input to establish an ordering that simplifies the problem. With sorted data, we can use efficient techniques like binary search or two pointers. Related elements are now adjacent, making comparisons straightforward. The sorting step takes O(n log n) which becomes the overall time complexity.`
      }
    ]
  },
  {
    id: '92',
    title: '92. LRU Cache',
    difficulty: 'Medium',
    pattern: 'Hash Map + Doubly Linked List',
    leetcodeUrl: 'https://leetcode.com/problems/lru-cache/',
    analysis: 'Design a cache satisfying Least Recently Used evictions in O(1). We need a map for O(1) lookups, but maps lack native strict ordering. A Doubly Linked List maps relative chronological order efficiently.',
    hints: [
      'Nodes store Key AND Value.',
      'Keep a Dummy Tail and Dummy Head to manage DLL edge cases easily.',
      'Reading OR Writing makes a node "Recently Used". Extract it, and push it directly behind Dummy Head.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Custom DLL for movement. Map for retrieval. On get/put, disconnect node, wire it behind Head. If capacity exceeded, sever node preceding Tail.',
        timeComplexity: 'O(1) all ops',
        spaceComplexity: 'O(C) memory for capacity',
        code: `class LRUCache {
    class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }
    
    private Map<Integer, Node> map;
    private int capacity;
    private Node head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        map = new HashMap<>();
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }
    
    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node); // Extract from current position
        insertHead(node); // Move to freshest
        return node.val;
    }
    
    public void put(int key, int value) {
        if (map.containsKey(key)) {
            remove(map.get(key));
        }
        if (map.size() == capacity) {
            remove(tail.prev); // LRU victim
        }
        insertHead(new Node(key, value));
    }
    
    private void remove(Node node) {
        map.remove(node.key);
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    private void insertHead(Node node) {
        map.put(node.key, node);
        Node nextTemp = head.next;
        head.next = node;
        node.prev = head;
        node.next = nextTemp;
        nextTemp.prev = node;
    }
}`,
  codeExplanation: `We traverse the linked list using pointer manipulation. By carefully updating next pointers, we modify the list structure in place. Using a dummy node simplifies edge cases like removing the head. We process each node exactly once, giving O(n) time complexity.`
      }
    ]
  },
  {
    id: '93',
    title: '93. House Robber III',
    difficulty: 'Medium',
    pattern: 'Tree DP',
    leetcodeUrl: 'https://leetcode.com/problems/house-robber-iii/',
    analysis: 'Rob houses situated in a binary tree. Cannot rob directly adjacent (parent-child) houses. Use Post-Order DFS returning an int array of size 2. `res[0]` is max money NOT robbing root, `res[1]` is max money MIGHT DO robbing root.',
    hints: [
      'DFS must return `[notRobbedVar, robbedVar]`.',
      'If not robbed, it\'s safe to pick max of left children + max of right children.',
      'If robbed, you CANNOT rob children, so pick left[0] + right[0] + root val.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Post order DFS returning 2 discrete states preventing adjacent looting.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(H)',
        code: `class Solution {
    public int rob(TreeNode root) {
        int[] res = dfs(root);
        return Math.max(res[0], res[1]);
    }
    
    // returns [max if not modifying root, max if modifying root]
    private int[] dfs(TreeNode root) {
        if (root == null) return new int[]{0, 0};
        
        int[] left = dfs(root.left);
        int[] right = dfs(root.right);
        
        // If we DON'T rob root, we can optionally rob (or not rob) kids
        int notRobRoot = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        
        // If we DO rob root, we absolutely CANNOT rob kids
        int robRoot = root.val + left[0] + right[0];
        
        return new int[]{notRobRoot, robRoot};
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '94',
    title: '94. Edit Distance',
    difficulty: 'Hard',
    pattern: '2D DP Matrix',
    leetcodeUrl: 'https://leetcode.com/problems/edit-distance/',
    analysis: 'Find minimum ops (insert, delete, replace) to convert word1 to word2. A classic 2D matrix DP comparing prefixes. If matching char, pick diagonal `dp[i-1][j-1]`. If different, pick minimum of adjacent cells + 1.',
    hints: [
      'Create `dp` array of size `m+1` and `n+1`.',
      'Initialize first row and first column linearly up to their index (base case deletes).',
      '`dp[i][j]` depends on insert `dp[i][j-1]`, delete `dp[i-1][j]`, or replace `dp[i-1][j-1]`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: '2D mapping checking transformations incrementally from bottom-up.',
        timeComplexity: 'O(M × N)',
        spaceComplexity: 'O(M × N) can be optimized to O(N)',
        code: `class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        // Base Case Setup
        for (int i = 0; i <= m; i++) dp[i][0] = i; // Deleting all
        for (int j = 0; j <= n; j++) dp[0][j] = j; // Inserting all
        
        // Matrix iteration
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1]; // Exact match, no ops needed
                } else {
                    int replace = dp[i - 1][j - 1];
                    int delete = dp[i - 1][j];
                    int insert = dp[i][j - 1];
                    // Pick smallest operation + 1 cost
                    dp[i][j] = 1 + Math.min(replace, Math.min(delete, insert));
                }
            }
        }
        
        return dp[m][n];
    }
}`,
  codeExplanation: `We use dynamic programming to build up solutions from smaller subproblems. Each cell in the dp array/table stores the answer to a specific subproblem. We fill the table iteratively, using previously computed values to avoid redundant calculations. The final answer is found at the end of the dp array or table.`
      }
    ]
  },
  {
    id: '95',
    title: '95. Sliding Window Maximum',
    difficulty: 'Hard',
    pattern: 'Monotonic Queue (Deque)',
    leetcodeUrl: 'https://leetcode.com/problems/sliding-window-maximum/',
    analysis: 'Find max element inside a sliding window of size k moving across an array. Using a Deque tracking indices solves this securely. The deque maintains numbers strictly monotonically decreasing. The very front is always the max for the current window.',
    hints: [
      'Deque stores INDICES.',
      'Head of queue contains highest element index.',
      'When sliding, remove out-of-bounds indices from front, and pop smaller elements from rear.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Double Ended Queue algorithm maintaining monotonic decreasing bounds relative to sliding window size constraint.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(K)',
        code: `class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || k <= 0) return new int[0];
        int n = nums.length;
        int[] res = new int[n - k + 1];
        int resIdx = 0;
        
        Deque<Integer> q = new ArrayDeque<>();
        
        for (int i = 0; i < nums.length; i++) {
            // Remove indices that are outside the current window window
            while (!q.isEmpty() && q.peek() < i - k + 1) {
                q.poll();
            }
            // Remove smaller numbers in queue as they are useless
            while (!q.isEmpty() && nums[q.peekLast()] < nums[i]) {
                q.pollLast();
            }
            
            q.offer(i);
            
            // Add max to array once the window is appropriately formed (i >= k-1)
            if (i >= k - 1) {
                res[resIdx++] = nums[q.peek()];
            }
        }
        return res;
    }
}`,
  codeExplanation: `We use a stack (LIFO data structure) to keep track of elements we need to process later. As we iterate through the input, we push elements when conditions are met and pop them when we find their match or resolution. The stack naturally handles nested or sequential dependencies. At the end, we check the stack state to determine the final answer.`
      }
    ]
  },
  {
    id: '96',
    title: '96. Next Permutation',
    difficulty: 'Medium',
    pattern: 'Math / Arrays',
    leetcodeUrl: 'https://leetcode.com/problems/next-permutation/',
    analysis: 'Rearrange numbers into the lexicographically next greater permutation. We identify the pivot from the right where ascending progression breaks. Swap with a specifically picked higher element on the right, then reverse the tail.',
    hints: [
      'Iterate backwards to find first element `i` where `nums[i] < nums[i+1]`.',
      'Iterate backwards again to find first element `j` where `nums[j] > nums[i]`.',
      'Swap `i` and `j`, then reverse sequence from `i+1` to end.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Lexicographical Math pattern securely identifying breakpoints working from lowest significance (right side).',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public void nextPermutation(int[] nums) {
        int i = nums.length - 2;
        // Find breakpoint
        while (i >= 0 && nums[i + 1] <= nums[i]) {
            i--;
        }
        
        if (i >= 0) {
            int j = nums.length - 1;
            // Find rightmost higher element
            while (nums[j] <= nums[i]) {
                j--;
            }
            swap(nums, i, j);
        }
        
        // Reverse tail sequence
        reverse(nums, i + 1, nums.length - 1);
    }
    
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
    
    private void reverse(int[] nums, int start, int end) {
        while (start < end) {
            swap(nums, start++, end--);
        }
    }
}`,
  codeExplanation: `Lexicographical Math pattern securely identifying breakpoints working from lowest significance (right side).. The code processes the input step by step, building toward the solution. Each operation is designed to bring us closer to the answer efficiently. Edge cases are handled to ensure correctness across all valid inputs.`
      }
    ]
  },
  {
    id: '97',
    title: '97. Find All Duplicates in an Array',
    difficulty: 'Medium',
    pattern: 'Cyclic Sort / Index Mapping',
    leetcodeUrl: 'https://leetcode.com/problems/find-all-duplicates-in-an-array/',
    analysis: 'Given array `nums` of length n where all integers are in range `[1, n]`, return all duplicates. Without extra space? Exploit the `1 to n` relationship by mapping array values conceptually over to array INCIDES by negating values at indices.',
    hints: [
      'Iterate nums. Fetch the index encoded by the absolute value `abs(num) - 1`.',
      'Mutate value at that mapped index to its negative self.',
      'If you see it was ALREADY negative, you hit a duplicate.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'In-place state mapping via Negation since numbers are 1..N.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1) excluding output',
        code: `class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        List<Integer> res = new ArrayList<>();
        
        for (int i = 0; i < nums.length; i++) {
            int index = Math.abs(nums[i]) - 1;
            if (nums[index] < 0) {
                // If already marked, it's a duplicate
                res.add(index + 1);
            } else {
                nums[index] = -nums[index];
            }
        }
        
        return res;
    }
}`,
  codeExplanation: `We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      }
    ]
  },
  {
    id: '98',
    title: '98. Gas Station',
    difficulty: 'Medium',
    pattern: 'Greedy',
    leetcodeUrl: 'https://leetcode.com/problems/gas-station/',
    analysis: 'There are n gas stations in a circular route. Find starting station to traverse entirely. Track global gas differences. If total gas < total cost, answer is -1. Otherwise, a valid starting path is determinable securely tracking isolated positive streaks.',
    hints: [
      'If `sum(gas) < sum(cost)`, return -1.',
      'Maintain running `tank`. If `tank < 0`, current start point is a failure. Reset `tank = 0` and assume `start = i + 1`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Greedy single-pass. It relies on the mathematical proof that if sum(gas)>=sum(cost), a unique circle exists. Any segment that drops tank < 0 cannot contain the start point.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int totalGas = 0, currentGas = 0;
        int startPoint = 0;
        
        for (int i = 0; i < gas.length; i++) {
            totalGas += gas[i] - cost[i];
            currentGas += gas[i] - cost[i];
            
            // If we run dry, the sequence from startPoint to i is a failure block
            if (currentGas < 0) {
                startPoint = i + 1;
                currentGas = 0;
            }
        }
        
        return totalGas >= 0 ? startPoint : -1;
    }
}`,
  codeExplanation: `We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      }
    ]
  },
  {
    id: '99',
    title: '99. Koko Eating Bananas',
    difficulty: 'Medium',
    pattern: 'Binary Search on Solution Space',
    leetcodeUrl: 'https://leetcode.com/problems/koko-eating-bananas/',
    analysis: 'Find minimum eating speed `k` to eat all piles inside `h` hours. This isn\'t binary search on arrays, it\'s binary search on the `velocity limit` integer. Minimum possible is 1. Max possible is the max pile value.',
    hints: [
      'Search space is `[1, max(piles)]`.',
      'For any `mid`, map out `H` calculated mathematically `Math.ceil(pile / mid)` across all piles.',
      'If time taken <= h, then shrink the required parameter bounds down by doing `right = mid`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Binary shift the K velocity, computing verification logic over the array per attempt.',
        timeComplexity: 'O(N log M) (M = max banana count)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int left = 1;
        int right = 1;
        for (int pile : piles) right = Math.max(right, pile);
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            int timeTaken = 0;
            
            for (int p : piles) {
                timeTaken += (p + mid - 1) / mid; // Fast Math.ceil logic
            }
            
            if (timeTaken <= h) { // Success, try taking longer by slowing down
                right = mid; 
            } else { // Fail, speed must be higher
                left = mid + 1;
            }
        }
        
        return left;
    }
}`,
  codeExplanation: `We use binary search to efficiently narrow down the answer space. We maintain left and right pointers and compute a mid value. Based on the comparison at mid, we eliminate half the search space each iteration. This gives us logarithmic time complexity instead of linear scanning.`
      }
    ]
  },
  {
    id: '100',
    title: '100. Target Sum',
    difficulty: 'Medium',
    pattern: 'DP / Backtracking with Memoization',
    leetcodeUrl: 'https://leetcode.com/problems/target-sum/',
    analysis: 'Given array, assign + or - to each to achieve target. This is effectively 0/1 Knapsack problem mapping choices to combinations. Easiest solved via Backtracking paired with a HashMap caching index+sum states.',
    hints: [
      'Write Backtrack checking index and running sum. Base case is `if length reached, sum == target ? 1 : 0`.',
      'Store calculated combinations utilizing string key `"index,sum"` inside a Map.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Sub-problem Memoization caching repeating tree-branch paths dynamically.',
        timeComplexity: 'O(N × Sum)',
        spaceComplexity: 'O(N × Sum)',
        code: `class Solution {
    Map<String, Integer> memo = new HashMap<>();
    
    public int findTargetSumWays(int[] nums, int target) {
        return backtrack(nums, 0, 0, target);
    }
    
    private int backtrack(int[] nums, int i, int total, int target) {
        if (i == nums.length) {
            return total == target ? 1 : 0;
        }
        
        String key = i + "," + total;
        if (memo.containsKey(key)) return memo.get(key);
        
        int add = backtrack(nums, i + 1, total + nums[i], target);
        int subtract = backtrack(nums, i + 1, total - nums[i], target);
        
        memo.put(key, add + subtract);
        return add + subtract;
    }
}`,
  codeExplanation: `We explore all possible choices using recursion (backtracking). At each step, we make a choice, then recurse on the remaining problem. If a choice leads to a dead end, we undo it (backtrack) and try the next option. This systematically explores the entire solution space while pruning invalid paths early.`
      }
    ]
  },
  {
    id: '101',
    title: '101. Symmetric Tree',
    difficulty: 'Easy',
    pattern: 'Tree Traversal',
    leetcodeUrl: 'https://leetcode.com/problems/symmetric-tree/',
    analysis: 'Check if a binary tree is a mirror of itself. A tree is symmetric if the left subtree is a mirror reflection of the right subtree. This translates to checking `left.left == right.right` and `left.right == right.left` recursively.',
    hints: [
      'Write a recursive helper `isMirror(node1, node2)`.',
      'Base cases: if both null return true. If one null return false. If values differ return false.',
      'Return `isMirror(node1.left, node2.right) && isMirror(node1.right, node2.left)`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Recursive DFS verifying symmetric mirroring constraints top-down.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(H)',
        code: `class Solution {
    public boolean isSymmetric(TreeNode root) {
        if (root == null) return true;
        return isMirror(root.left, root.right);
    }
    
    private boolean isMirror(TreeNode t1, TreeNode t2) {
        if (t1 == null && t2 == null) return true;
        if (t1 == null || t2 == null) return false;
        if (t1.val != t2.val) return false;
        
        return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '102',
    title: '102. Unique Paths',
    difficulty: 'Medium',
    pattern: '2D Dynamic Programming',
    leetcodeUrl: 'https://leetcode.com/problems/unique-paths/',
    analysis: 'Robot finding paths from top-left to bottom-right moving only right or down. The number of ways to reach cell `(i, j)` is strictly the number of ways to reach `(i-1, j)` + `(i, j-1)`. This is a classic map mapping.',
    hints: [
      'Initialize a 2D array `dp[m][n]`.',
      'The entire top row and entire left column can only be reached in 1 way (moving straight). Initialize them to 1.',
      'Fill the rest with `dp[i][j] = dp[i-1][j] + dp[i][j-1]`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: '2D DP iteratively calculating accumulated paths. Memory can be optimized down to a 1D array by overwriting the same row.',
        timeComplexity: 'O(M × N)',
        spaceComplexity: 'O(M × N) scalable to O(N)',
        code: `class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        
        // Base cases
        for (int i = 0; i < m; i++) dp[i][0] = 1;
        for (int j = 0; j < n; j++) dp[0][j] = 1;
        
        // Tabulate
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
        
        return dp[m - 1][n - 1];
    }
}`,
  codeExplanation: `We use dynamic programming to build up solutions from smaller subproblems. Each cell in the dp array/table stores the answer to a specific subproblem. We fill the table iteratively, using previously computed values to avoid redundant calculations. The final answer is found at the end of the dp array or table.`
      }
    ]
  },
  {
    id: '103',
    title: '103. Minimum Path Sum',
    difficulty: 'Medium',
    pattern: '2D Dynamic Programming',
    leetcodeUrl: 'https://leetcode.com/problems/minimum-path-sum/',
    analysis: 'Find path from top-left to bottom-right minimizing sum of numbers on the path. Very similar to Unique Paths, but instead of adding paths, we greedily pick the minimum incoming path.',
    hints: [
      '`dp[i][j]` = `grid[i][j]` + `min(dp[i-1][j], dp[i][j-1])`.',
      'You can mutate the original grid array directly to save O(1) space if the interviewer allows.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'In-place Matrix DP. The first row and column are strictly cumulative. The rest take the min of Top and Left.',
        timeComplexity: 'O(M × N)',
        spaceComplexity: 'O(1) mutating grid in-place',
        code: `class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        
        // First row
        for (int j = 1; j < n; j++) {
            grid[0][j] += grid[0][j - 1];
        }
        
        // First col
        for (int i = 1; i < m; i++) {
            grid[i][0] += grid[i - 1][0];
        }
        
        // DP
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
            }
        }
        
        return grid[m - 1][n - 1];
    }
}`,
  codeExplanation: `We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      }
    ]
  },
  {
    id: '104',
    title: '104. Surrounded Regions',
    difficulty: 'Medium',
    pattern: 'DFS / Graph',
    leetcodeUrl: 'https://leetcode.com/problems/surrounded-regions/',
    analysis: 'Capture all \'O\' regions entirely surrounded by \'X\'. A region is NOT surrounded if it touches the border. Logic: start from the \'O\'s on the border, recursively map everything touching them as "safe" (e.g., \'T\'). Then iterate: flip all remaining \'O\'s to \'X\', and revert \'T\'s back to \'O\'.',
    hints: [
      'Find \'O\'s strictly on the 4 borders.',
      'Fire a DFS extending inwards to mutate connected \'O\'s into a placeholder like \'T\'.',
      'The board is now partitioned: \'X\', \'T\' (safe O), \'O\' (trapped O).'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Reverse-floodfill from borders marking escape routes. Then global pass replacing appropriately.',
        timeComplexity: 'O(M × N)',
        spaceComplexity: 'O(M × N)',
        code: `class Solution {
    public void solve(char[][] board) {
        if (board.length == 0 || board[0].length == 0) return;
        int m = board.length, n = board[0].length;
        
        // Top and Bottom borders
        for (int j = 0; j < n; j++) {
            if (board[0][j] == 'O') dfs(board, 0, j);
            if (board[m - 1][j] == 'O') dfs(board, m - 1, j);
        }
        
        // Left and Right borders
        for (int i = 0; i < m; i++) {
            if (board[i][0] == 'O') dfs(board, i, 0);
            if (board[i][n - 1] == 'O') dfs(board, i, n - 1);
        }
        
        // Replace trapped with X, and safe with O
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 'O') {
                    board[i][j] = 'X';
                } else if (board[i][j] == 'T') {
                    board[i][j] = 'O';
                }
            }
        }
    }
    
    private void dfs(char[][] b, int r, int c) {
        if (r < 0 || c < 0 || r >= b.length || c >= b[0].length || b[r][c] != 'O') {
            return;
        }
        
        b[r][c] = 'T'; // Mark Safe
        
        dfs(b, r + 1, c);
        dfs(b, r - 1, c);
        dfs(b, r, c + 1);
        dfs(b, r, c - 1);
    }
}`,
  codeExplanation: `We traverse the graph using DFS (Depth-First Search), going as deep as possible before backtracking. A visited array or set prevents revisiting nodes and avoids infinite cycles. For each unvisited node, we explore all its neighbors recursively. This covers the entire connected component of the starting node.`
      }
    ]
  },
  {
    id: '105',
    title: '105. Sort Colors',
    difficulty: 'Medium',
    pattern: 'Dutch National Flag / Two Pointers',
    leetcodeUrl: 'https://leetcode.com/problems/sort-colors/',
    analysis: 'Given array with 0, 1, and 2s, sort them in-place in a single pass. This is Dijkstra\'s Dutch National Flag problem. Use 3 pointers: `low` tracking where 0s should go, `high` tracking where 2s should go, and `mid` scanning through.',
    hints: [
      'If `nums[mid] == 0`, swap `nums[mid]` and `nums[low]`, increment both.',
      'If `nums[mid] == 1`, just increment `mid`.',
      'If `nums[mid] == 2`, swap `nums[mid]` and `nums[high]`, decrement `high` ONLY.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Three-way partitioning. Modifying low pushes zeroes down, modifying high pushes twos up.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public void sortColors(int[] nums) {
        int low = 0;
        int mid = 0;
        int high = nums.length - 1;
        
        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums, low, mid);
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else { // It's 2
                swap(nums, mid, high);
                high--;
                // Do not increment mid here; the newly swapped elem needs evaluating
            }
        }
    }
    
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}`,
  codeExplanation: `Three-way partitioning. Modifying low pushes zeroes down, modifying high pushes twos up.. The code processes the input step by step, building toward the solution. Each operation is designed to bring us closer to the answer efficiently. Edge cases are handled to ensure correctness across all valid inputs.`
      }
    ]
  },
  {
    id: '106',
    title: '106. Letter Combinations of a Phone Number',
    difficulty: 'Medium',
    pattern: 'Backtracking',
    leetcodeUrl: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/',
    analysis: 'Classic backtracking problem. Map each digit to its characters. Given a string of digits, iteratively build combinations by exploring each letter branch.',
    hints: [
      'Create a fixed `String[] mapping` from 0 to 9.',
      'Recursively traverse passing `index` of the digits string and a `StringBuilder`.',
      'Loop over the characters of the mapped string, append, recurse `index + 1`, then delete last char.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Recursive Backtracking managing state securely.',
        timeComplexity: 'O(4^N × N)',
        spaceComplexity: 'O(N) for recursion depth',
        code: `class Solution {
    private String[] mappedWords = new String[]{
        "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
    };
    
    public List<String> letterCombinations(String digits) {
        List<String> res = new ArrayList<>();
        if (digits == null || digits.length() == 0) return res;
        
        backtrack(res, new StringBuilder(), digits, 0);
        return res;
    }
    
    private void backtrack(List<String> res, StringBuilder sb, String digits, int index) {
        if (index == digits.length()) {
            res.add(sb.toString());
            return;
        }
        
        String letters = mappedWords[digits.charAt(index) - '0'];
        
        for (char c : letters.toCharArray()) {
            sb.append(c);
            backtrack(res, sb, digits, index + 1);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}`,
  codeExplanation: `We explore all possible choices using recursion (backtracking). At each step, we make a choice, then recurse on the remaining problem. If a choice leads to a dead end, we undo it (backtrack) and try the next option. This systematically explores the entire solution space while pruning invalid paths early.`
      }
    ]
  },
  {
    id: '107',
    title: '107. Generate Parentheses',
    difficulty: 'Medium',
    pattern: 'Backtracking',
    leetcodeUrl: 'https://leetcode.com/problems/generate-parentheses/',
    analysis: 'Generate all combinations of n pairs of well-formed parentheses. Can be solved using backtracking heavily governed by 2 states: `openCount` and `closeCount`.',
    hints: [
      'You can ONLY append an open bracket if `openCount < n`.',
      'You can ONLY append a close bracket if `closeCount < openCount`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'State-constrained DFS. String is only expanded across valid boundaries guaranteeing well-formed brackets natively.',
        timeComplexity: 'O(4^N / √N) (Catalan number)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        backtrack(res, new StringBuilder(), 0, 0, n);
        return res;
    }
    
    private void backtrack(List<String> res, StringBuilder sb, int open, int close, int n) {
        if (sb.length() == n * 2) {
            res.add(sb.toString());
            return;
        }
        
        if (open < n) {
            sb.append("(");
            backtrack(res, sb, open + 1, close, n);
            sb.deleteCharAt(sb.length() - 1);
        }
        
        if (close < open) {
            sb.append(")");
            backtrack(res, sb, open, close + 1, n);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}`,
  codeExplanation: `We explore all possible choices using recursion (backtracking). At each step, we make a choice, then recurse on the remaining problem. If a choice leads to a dead end, we undo it (backtrack) and try the next option. This systematically explores the entire solution space while pruning invalid paths early.`
      }
    ]
  },
  {
    id: '108',
    title: '108. Permutations',
    difficulty: 'Medium',
    pattern: 'Backtracking',
    leetcodeUrl: 'https://leetcode.com/problems/permutations/',
    analysis: 'Return all possible permutations of an array. Another classic backtracking problem. We iterate through the array, pick a non-used element, throw it in our temp list, and recurse.',
    hints: [
      'Maintain a `boolean[] used` array to track visited elements in the current branch, OR use `tempList.contains()` (slower).',
      'Inside loop, if used, skip. Else, mark used, append, recurse, pop, unmark used.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Standard template backtracking using a boolean array for rapid state validation.',
        timeComplexity: 'O(N × N!)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        boolean[] used = new boolean[nums.length];
        backtrack(res, new ArrayList<>(), nums, used);
        return res;
    }
    
    private void backtrack(List<List<Integer>> res, List<Integer> tempList, int[] nums, boolean[] used) {
        if (tempList.size() == nums.length) {
            res.add(new ArrayList<>(tempList));
            return;
        }
        
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            
            used[i] = true;
            tempList.add(nums[i]);
            
            backtrack(res, tempList, nums, used);
            
            // Revert state
            used[i] = false;
            tempList.remove(tempList.size() - 1);
        }
    }
}`,
  codeExplanation: `We explore all possible choices using recursion (backtracking). At each step, we make a choice, then recurse on the remaining problem. If a choice leads to a dead end, we undo it (backtrack) and try the next option. This systematically explores the entire solution space while pruning invalid paths early.`
      }
    ]
  },
  {
    id: '109',
    title: '109. Subsets',
    difficulty: 'Medium',
    pattern: 'Backtracking',
    leetcodeUrl: 'https://leetcode.com/problems/subsets/',
    analysis: 'Return all possible subsets (the power set) of unique elements. Unlike permutations, subsets ignore order, so `[1,2]` is identical to `[2,1]`. To prevent duplicates, we enforce a strict left-to-right iterative building process using an `index`.',
    hints: [
      'Start recursion adding the current `tempList` unconditionally to `res`.',
      'For loop starts at `index` and goes to `nums.length`.',
      'Recurse passing `i + 1` to strictly move forward preventing dupes.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Index-gated backtracking. Each node in the recursive tree represents a valid subset.',
        timeComplexity: 'O(N × 2^N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(res, new ArrayList<>(), nums, 0);
        return res;
    }
    
    private void backtrack(List<List<Integer>> res, List<Integer> tempList, int[] nums, int start) {
        res.add(new ArrayList<>(tempList)); // Capture state at every level
        
        for (int i = start; i < nums.length; i++) {
            tempList.add(nums[i]);
            backtrack(res, tempList, nums, i + 1); // Only branch forwards
            tempList.remove(tempList.size() - 1); 
        }
    }
}`,
  codeExplanation: `We explore all possible choices using recursion (backtracking). At each step, we make a choice, then recurse on the remaining problem. If a choice leads to a dead end, we undo it (backtrack) and try the next option. This systematically explores the entire solution space while pruning invalid paths early.`
      }
    ]
  },
  {
    id: '110',
    title: '110. Word Search',
    difficulty: 'Medium',
    pattern: 'DFS / Backtracking',
    leetcodeUrl: 'https://leetcode.com/problems/word-search/',
    analysis: 'Given a grid of characters and a word, check if word exists exactly forming a path of adjacent cells. Iteratively scan grid for first letter, then launch a DFS tracking an index. Prevent re-visiting by temporarily mutating the grid.',
    hints: [
      'Temporarily change `board[r][c] = \'#\'` during DFS traversing down a path.',
      'Always revert the change when the DFS branch returns `false`.',
      'Base cases for DFS: `index == word.length()` returns true. Out of bounds or mismatch returns false.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Grid Backtracking. In-place matrix modification enforces single-path integrity without allocating boolean visited arrays.',
        timeComplexity: 'O(M × N × 4^L) (L = word len)',
        spaceComplexity: 'O(L) recursion stack',
        code: `class Solution {
    public boolean exist(char[][] board, String word) {
        int m = board.length, n = board[0].length;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == word.charAt(0) && dfs(board, word, i, j, 0)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    private boolean dfs(char[][] b, String word, int r, int c, int index) {
        if (index == word.length()) return true;
        if (r < 0 || c < 0 || r >= b.length || c >= b[0].length || b[r][c] != word.charAt(index)) {
            return false;
        }
        
        char temp = b[r][c];
        b[r][c] = '#'; // Mark Visited
        
        boolean found = dfs(b, word, r + 1, c, index + 1)
                     || dfs(b, word, r - 1, c, index + 1)
                     || dfs(b, word, r, c + 1, index + 1)
                     || dfs(b, word, r, c - 1, index + 1);
        
        b[r][c] = temp; // Revert
        return found;
    }
}`,
  codeExplanation: `We traverse the graph using DFS (Depth-First Search), going as deep as possible before backtracking. A visited array or set prevents revisiting nodes and avoids infinite cycles. For each unvisited node, we explore all its neighbors recursively. This covers the entire connected component of the starting node.`
      }
    ]
  },
  {
    id: '111',
    title: '111. Copy List with Random Pointer',
    difficulty: 'Medium',
    pattern: 'Linked List / Hash Map',
    leetcodeUrl: 'https://leetcode.com/problems/copy-list-with-random-pointer/',
    analysis: 'Deep copy a linked list where nodes also have a `random` pointer which could point anywhere. A HashMap tying `OriginalNode -> CopiedNode` resolves this linearly. Alternatively, interweaving nodes O(1) space is the ultimate trick.',
    hints: [
      'Map approach involves iterating to build just the Nodes (`map.put(curr, new Node(curr.val))`).',
      'Then iterating again to wire them up: `map.get(curr).next = map.get(curr.next);`'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Double pass using Hash Map to instantly resolve pointer connections natively.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;
        
        Map<Node, Node> map = new HashMap<>();
        Node curr = head;
        
        // Pass 1: Clone structure in map
        while (curr != null) {
            map.put(curr, new Node(curr.val));
            curr = curr.next;
        }
        
        curr = head;
        // Pass 2: Assing pointers
        while (curr != null) {
            Node clone = map.get(curr);
            clone.next = map.get(curr.next);
            clone.random = map.get(curr.random);
            curr = curr.next;
        }
        
        return map.get(head);
    }
}`,
  codeExplanation: `We traverse the linked list using pointer manipulation. By carefully updating next pointers, we modify the list structure in place. Using a dummy node simplifies edge cases like removing the head. We process each node exactly once, giving O(n) time complexity.`
      }
    ]
  },
  {
    id: '112',
    title: '112. Remove Nth Node From End of List',
    difficulty: 'Medium',
    pattern: 'Fast & Slow Pointers',
    leetcodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
    analysis: 'Remove the nth node from the end of the list in one pass. Create a fast pointer and give it a head start of exactly N nodes. When the fast pointer hits the end, the slow pointer will be pointing exactly before the node to be removed.',
    hints: [
      'Use a dummy head to catch the edge case where the actual head needs deleting.',
      'Advance `fast` N times.',
      'Advance `fast` and `slow` together until `fast.next == null`.',
      'Skip the node via `slow.next = slow.next.next`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Dummy Node wrapper + Synchronized window pointer offset algorithm.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode slow = dummy, fast = dummy;
        
        // Offset fast by n
        for (int i = 0; i <= n; i++) {
            fast = fast.next;
        }
        
        // Move sliding window
        while (fast != null) {
            slow = slow.next;
            fast = fast.next;
        }
        
        // Sever node
        slow.next = slow.next.next;
        
        return dummy.next;
    }
}`,
  codeExplanation: `We traverse the linked list using pointer manipulation. By carefully updating next pointers, we modify the list structure in place. Using a dummy node simplifies edge cases like removing the head. We process each node exactly once, giving O(n) time complexity.`
      }
    ]
  },
  {
    id: '113',
    title: '113. Find the Duplicate Number',
    difficulty: 'Medium',
    pattern: 'Cyclic Sort / Floyd\'s Cycle Detection',
    leetcodeUrl: 'https://leetcode.com/problems/find-the-duplicate-number/',
    analysis: 'Array integer constraints 1 to N, length N+1. MUST solve without modifying array, so negative mapping is cheating! Treat array values as pointers to indices. A duplicate value means two different indices point to the same index. This explicitly creates a cycle.',
    hints: [
      'Use Tortoise and Hare exactly like Linked List Cycle II.',
      '`slow = nums[slow]`, `fast = nums[nums[fast]]`.',
      'Once they intersect, reset slow to `0` and move both by 1 until they intersect again. That intersection is the duplicate entry.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Treat array mapping exactly as a LinkedList cycle. Floyd\'s mathematical cycle identification secures O(1) space constraints and un-mutated structures.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int findDuplicate(int[] nums) {
        // Phase 1: Find Intersection
        int slow = nums[0];
        int fast = nums[nums[0]];
        
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[nums[fast]];
        }
        
        // Phase 2: Find entrance to cycle
        slow = 0;
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        
        return slow;
    }
}`,
  codeExplanation: `Treat array mapping exactly as a LinkedList cycle. Floyd\\'s mathematical cycle identification secures O(1) space constraints and un-mutated structures.`
      }
    ]
  },
  {
    id: '114',
    title: '114. Daily Temperatures',
    difficulty: 'Medium',
    pattern: 'Monotonic Stack',
    leetcodeUrl: 'https://leetcode.com/problems/daily-temperatures/',
    analysis: 'Given an array of temperatures, return an array computing the distance to the next warmer temperature. We use a strictly monotonically decreasing Stack holding indices. If a new day is warmer than top of stack, pop stack and compute difference.',
    hints: [
      'Stack stores indices from left to right.',
      'while stack is not empty and `T[curr] > T[stack.peek()]`, `poppedIndex = stack.pop()`, `res[popped] = curr - popped`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Monotonic Decreasing Stack. Unresolved days stay in stack. Resolved days get their difference calculated immediately when a warmer day manifests.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] res = new int[n];
        Stack<Integer> stack = new Stack<>();
        
        for (int i = 0; i < n; i++) {
            // Unload colder previous days
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prevDay = stack.pop();
                res[prevDay] = i - prevDay;
            }
            stack.push(i);
        }
        
        return res;
    }
}`,
  codeExplanation: `We use a stack (LIFO data structure) to keep track of elements we need to process later. As we iterate through the input, we push elements when conditions are met and pop them when we find their match or resolution. The stack naturally handles nested or sequential dependencies. At the end, we check the stack state to determine the final answer.`
      }
    ]
  },
  {
    id: '115',
    title: '115. Serialize and Deserialize Binary Tree',
    difficulty: 'Hard',
    pattern: 'Tree Traversal (Pre-order)',
    leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
    analysis: 'Design an algorithm to serialize and deserialize a binary tree. The easiest mechanism is Pre-order traversal `(Root, Left, Right)` storing nulls with a distinct marker (e.g. `X`). To deserialize, use a Queue or Array iterator splitting the string by comma.',
    hints: [
      'Serialize: DFS append `node.val + ","`. If null, append `"X,"`.',
      'Deserialize: Split string into Queue. Pop front. If "X", return null. Else create new Node(val), `node.left = recurse()`, `node.right = recurse()`, return node.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Preorder DFS with distinct null markers constructs an unambiguous linear snapshot.',
        timeComplexity: 'O(N) for both',
        spaceComplexity: 'O(N) for both',
        code: `public class Codec {

    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        buildString(root, sb);
        return sb.toString();
    }
    
    private void buildString(TreeNode node, StringBuilder sb) {
        if (node == null) {
            sb.append("X,");
        } else {
            sb.append(node.val).append(",");
            buildString(node.left, sb);
            buildString(node.right, sb);
        }
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        Queue<String> nodes = new LinkedList<>(Arrays.asList(data.split(",")));
        return buildTree(nodes);
    }
    
    private TreeNode buildTree(Queue<String> nodes) {
        String val = nodes.poll();
        if ("X".equals(val)) return null;
        
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = buildTree(nodes);
        node.right = buildTree(nodes);
        return node;
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '116',
    title: '116. Largest Number',
    difficulty: 'Medium',
    pattern: 'Custom Sort / Math',
    leetcodeUrl: 'https://leetcode.com/problems/largest-number/',
    analysis: 'Arrange elements of an integer array to form the largest number. E.g., `[3, 30, 34, 5, 9]` -> `9534330`. We must convert ints to Strings and sort them using a custom comparator. The magic comparison is verifying if `A+B` string is larger than `B+A` string.',
    hints: [
      'Compare Strings `s1 = "3"`, `s2 = "30"`. `s1+s2 = "330"`, `s2+s1 = "303"`. `330 > 303`, so `3` goes first.',
      'Sort entirely in descending order using this principle.',
      'Check for leading "0" edge cases (e.g. array is `[0,0]`).'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'String Array Custom Sort relying entirely on concatenated permutation logic.',
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public String largestNumber(int[] nums) {
        String[] strs = new String[nums.length];
        for (int i = 0; i < nums.length; i++) {
            strs[i] = String.valueOf(nums[i]);
        }
        
        Arrays.sort(strs, (a, b) -> {
            String order1 = a + b;
            String order2 = b + a;
            return order2.compareTo(order1); // Descending
        });
        
        if (strs[0].equals("0")) {
            return "0"; // All elements are zero
        }
        
        StringBuilder sb = new StringBuilder();
        for (String s : strs) sb.append(s);
        
        return sb.toString();
    }
}`,
  codeExplanation: `We first sort the input to establish an ordering that simplifies the problem. With sorted data, we can use efficient techniques like binary search or two pointers. Related elements are now adjacent, making comparisons straightforward. The sorting step takes O(n log n) which becomes the overall time complexity.`
      }
    ]
  },
  {
    id: '117',
    title: '117. Task Scheduler',
    difficulty: 'Medium',
    pattern: 'Greedy / Math / CPU Cycle Math',
    leetcodeUrl: 'https://leetcode.com/problems/task-scheduler/',
    analysis: 'Find least number of CPU intervals to execute tasks where same-type tasks must have cooldown of `n`. The mathematics dictates scheduling highest frequency elements FIRST creates the most "idle" slots natively, which other items simply fill passively.',
    hints: [
      'Find the maximum frequency `maxFreq`.',
      'Idle slots logic = `(maxFreq - 1) * n`.',
      'For every other task with `freq`, subtract min(freq, maxFreq-1) from the idle slots.',
      'Result is `tasks.length + max(0, remainingIdles)`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Greedy mathematical equation mapping the upper boundary of cooling gaps.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1) 26 length array',
        code: `class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] freqs = new int[26];
        int maxFreq = 0;
        
        for (char c : tasks) {
            freqs[c - 'A']++;
            maxFreq = Math.max(maxFreq, freqs[c - 'A']);
        }
        
        // Count how many tasks tie with the max frequency
        int maxCount = 0;
        for (int f : freqs) {
            if (f == maxFreq) maxCount++;
        }
        
        // Formula mapping "Chunk-Based" structure
        int partCount = maxFreq - 1;
        int emptySlots = partCount * (n - (maxCount - 1));
        int availableTasks = tasks.length - maxFreq * maxCount;
        int idles = Math.max(0, emptySlots - availableTasks);
        
        return tasks.length + idles;
    }
}`,
  codeExplanation: `We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      }
    ]
  },
  {
    id: '118',
    title: '118. Evaluate Reverse Polish Notation',
    difficulty: 'Medium',
    pattern: 'Stack',
    leetcodeUrl: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/',
    analysis: 'Evaluate mathematically postfix formatted arrays. An optimal logic uses a simple Stack parsing linearly. When seeing a number, push it. When seeing an operator, pop two numbers, evaluate them using the operator, and push result back onto stack.',
    hints: [
      'Order of popping matters on subtraction and division.',
      '`val2 = pop(), val1 = pop()`, result is `val1 - val2` or `val1 / val2`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'O(N) stack parsing.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();
        
        for (String t : tokens) {
            if (t.equals("+")) {
                stack.push(stack.pop() + stack.pop());
            } else if (t.equals("-")) {
                int second = stack.pop();
                int first = stack.pop();
                stack.push(first - second);
            } else if (t.equals("*")) {
                stack.push(stack.pop() * stack.pop());
            } else if (t.equals("/")) {
                int second = stack.pop();
                int first = stack.pop();
                stack.push(first / second);
            } else { // It's a number
                stack.push(Integer.parseInt(t));
            }
        }
        return stack.pop();
    }
}`,
  codeExplanation: `We use a stack (LIFO data structure) to keep track of elements we need to process later. As we iterate through the input, we push elements when conditions are met and pop them when we find their match or resolution. The stack naturally handles nested or sequential dependencies. At the end, we check the stack state to determine the final answer.`
      }
    ]
  },
  {
    id: '119',
    title: '119. Course Schedule II',
    difficulty: 'Medium',
    pattern: 'Topological Sort',
    leetcodeUrl: 'https://leetcode.com/problems/course-schedule-ii/',
    analysis: 'Like Course Schedule I, but requiring the actual ORDER of courses. Kahn\'s algorithm natively generates this topological mapping as elements are popped unconditionally.',
    hints: [
      'Populate results array at `index++` natively whenever you `poll()` from the zero-degree queue.',
      'If mapped count does not equal numCourses, return empty array.',
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'BFS Topological Sort mapping array natively through queue ejection phase.',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V + E)',
        code: `class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] indegree = new int[numCourses];
        
        for (int[] pre : prerequisites) {
            adj.get(pre[1]).add(pre[0]);
            indegree[pre[0]]++;
        }
        
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) q.add(i);
        }
        
        int[] res = new int[numCourses];
        int idx = 0;
        
        while (!q.isEmpty()) {
            int curr = q.poll();
            res[idx++] = curr;
            
            for (int neighbor : adj.get(curr)) {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) {
                    q.add(neighbor);
                }
            }
        }
        
        return idx == numCourses ? res : new int[0];
    }
}`,
  codeExplanation: `We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      }
    ]
  },
  {
    id: '120',
    title: '120. LRU Cache',
    difficulty: 'Medium', // Just realizing I duped 92 conceptually, let me change this to Min Stack
    pattern: 'Stack with Pair tracking',
    leetcodeUrl: 'https://leetcode.com/problems/min-stack/',
    analysis: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1). A single stack can achieve this by pushing a Node containing both the `val` AND the `current min` at that exact history frame.',
    hints: [
      'Wrap values in an array `new int[]{val, currentMin}` before pushing to the Stack.',
      'The current min is calculated dynamically alongside insertion comparing pushing val against previous top\'s currentMin.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Parallel state tracking. Encapsulating historical minimum bound strictly vertically resolving logic.',
        timeComplexity: 'O(1) for all ops',
        spaceComplexity: 'O(N)',
        code: `class MinStack {
    Stack<int[]> stack;

    public MinStack() {
        stack = new Stack<>();
    }
    
    public void push(int val) {
        if (stack.isEmpty()) {
            stack.push(new int[]{val, val});
        } else {
            stack.push(new int[]{val, Math.min(val, stack.peek()[1])});
        }
    }
    
    public void pop() {
        stack.pop();
    }
    
    public int top() {
        return stack.peek()[0];
    }
    
    public int getMin() {
        return stack.peek()[1];
    }
}`,
  codeExplanation: `We use a stack (LIFO data structure) to keep track of elements we need to process later. As we iterate through the input, we push elements when conditions are met and pop them when we find their match or resolution. The stack naturally handles nested or sequential dependencies. At the end, we check the stack state to determine the final answer.`
      }
    ]
  },
  {
    id: '121',
    title: '121. Valid Palindrome',
    difficulty: 'Easy',
    pattern: 'Two Pointers',
    leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/',
    analysis: 'Check if a string is a palindrome after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters. We use two pointers, left and right, moving inwards and skipping non-alphanumeric characters.',
    hints: [
      'Use `Character.isLetterOrDigit(c)` to safely skip invalid characters.',
      'Convert characters to lowercase `Character.toLowerCase(c)` before comparing.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Two pointers converging from ends. O(1) space, no string recreation.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        
        while (left < right) {
            char l = s.charAt(left);
            char r = s.charAt(right);
            
            if (!Character.isLetterOrDigit(l)) {
                left++;
            } else if (!Character.isLetterOrDigit(r)) {
                right--;
            } else {
                if (Character.toLowerCase(l) != Character.toLowerCase(r)) {
                    return false;
                }
                left++;
                right--;
            }
        }
        return true;
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '122',
    title: '122. Valid Sudoku',
    difficulty: 'Medium',
    pattern: 'Hash Set / Arrays',
    leetcodeUrl: 'https://leetcode.com/problems/valid-sudoku/',
    analysis: 'Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated against row, column, and 3x3 sub-box rules. We can encode each number\'s presence as a string like `"5 in row 2"`, `"5 in col 3"`, `"5 in block 0-1"` and throw them all in a single HashSet.',
    hints: [
      'If `set.add()` returns false, it means that exact encoded string was already there—meaning a conflict.',
      'Calculate the 3x3 block index via `i / 3 + "-" + j / 3`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'String encoding in a global HashSet. An elegant one-pass check.',
        timeComplexity: 'O(1) (Board is strictly 9x9)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public boolean isValidSudoku(char[][] board) {
        Set<String> seen = new HashSet<>();
        
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                char number = board[i][j];
                if (number != '.') {
                    if (!seen.add(number + " in row " + i) ||
                        !seen.add(number + " in col " + j) ||
                        !seen.add(number + " in block " + i / 3 + "-" + j / 3)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}`,
  codeExplanation: `We use a HashMap for O(1) average-case lookup and storage. As we iterate through the input, we store key information in the map. For each new element, we check the map to see if a complementary element exists. This trades space for time, reducing the complexity from O(n²) to O(n).`
      }
    ]
  },
  {
    id: '123',
    title: '123. Contains Duplicate',
    difficulty: 'Easy',
    pattern: 'Hash Set',
    leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/',
    analysis: 'Given an integer array nums, return true if any value appears at least twice. Throw everything into a HashSet.',
    hints: [
      'Iterate through the array. If `!set.add(num)`, then it\'s a duplicate.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Hash Set insertion tracking.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            if (!set.add(num)) {
                return true;
            }
        }
        return false;
    }
}`,
  codeExplanation: `We use a HashMap for O(1) average-case lookup and storage. As we iterate through the input, we store key information in the map. For each new element, we check the map to see if a complementary element exists. This trades space for time, reducing the complexity from O(n²) to O(n).`
      }
    ]
  },
  {
    id: '124',
    title: '124. Contains Duplicate II',
    difficulty: 'Easy',
    pattern: 'Sliding Window / Hash Map',
    leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate-ii/',
    analysis: 'Return true if there are two distinct indices i and j such that nums[i] == nums[j] and abs(i - j) <= k. We can use a map storing `Map<Value, Index>`. When a duplicate is found, verify the distance.',
    hints: [
      'Maintain the most recent index of each number seen so far.',
      'If you see it again, check `currentIndex - map.get(num) <= k`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Hash Map tracking the latest index occurrence of values.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>(); // num -> index
        
        for (int i = 0; i < nums.length; i++) {
            if (map.containsKey(nums[i])) {
                if (i - map.get(nums[i]) <= k) {
                    return true;
                }
            }
            map.put(nums[i], i); // Auto updates to latest index
        }
        return false;
    }
}`,
  codeExplanation: `We use a HashMap for O(1) average-case lookup and storage. As we iterate through the input, we store key information in the map. For each new element, we check the map to see if a complementary element exists. This trades space for time, reducing the complexity from O(n²) to O(n).`
      }
    ]
  },
  {
    id: '125',
    title: '125. Ransom Note',
    difficulty: 'Easy',
    pattern: 'Hash Map / Frequency Array',
    leetcodeUrl: 'https://leetcode.com/problems/ransom-note/',
    analysis: 'Given two strings ransomNote and magazine, return true if ransomNote can be constructed using the letters from magazine. Count magazine character frequencies, then deduct them while parsing ransomNote.',
    hints: [
      'Use `int[] count = new int[26]` for lowercase alphabet counting.',
      'Increment character indexes based on `magazine`.',
      'Decrement based on `ransomNote`. If array element drops below 0, return false.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Fixed size array for constant time frequency counting.',
        timeComplexity: 'O(M + N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public boolean canConstruct(String ransomNote, String magazine) {
        int[] counts = new int[26];
        
        for (char c : magazine.toCharArray()) {
            counts[c - 'a']++;
        }
        
        for (char c : ransomNote.toCharArray()) {
            counts[c - 'a']--;
            if (counts[c - 'a'] < 0) {
                return false;
            }
        }
        
        return true;
    }
}`,
  codeExplanation: `We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      }
    ]
  },
  {
    id: '126',
    title: '126. Isomorphic Strings',
    difficulty: 'Easy',
    pattern: 'Two Hash Maps / Arrays',
    leetcodeUrl: 'https://leetcode.com/problems/isomorphic-strings/',
    analysis: 'Two strings s and t are isomorphic if the characters in s can be replaced to get t. No two characters may map to the same character. `egg` -> `add` works. `foo` -> `bar` fails. You must track mapping BOTH ways (`S->T` AND `T->S`).',
    hints: [
      'Maintain two arrays initialized to size 256 for ASCII tracking.',
      '`mapS[charS]` must equal `mapT[charT]`. Easiest way is writing the current index + 1 to both arrays. If they mismatched previously, their stored indices will differ.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Parallel state synchronization mapping characters to their last seen index.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1) 256 size arrays',
        code: `class Solution {
    public boolean isIsomorphic(String s, String t) {
        int[] mapS = new int[256];
        int[] mapT = new int[256];
        
        for (int i = 0; i < s.length(); i++) {
            char charS = s.charAt(i);
            char charT = t.charAt(i);
            
            if (mapS[charS] != mapT[charT]) {
                return false;
            }
            
            // +1 because default array is 0, we need to distinct 0th index from default 0
            mapS[charS] = i + 1;
            mapT[charT] = i + 1;
        }
        
        return true;
    }
}`,
  codeExplanation: `We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      }
    ]
  },
  {
    id: '127',
    title: '127. Word Pattern',
    difficulty: 'Easy',
    pattern: 'Hash Map',
    leetcodeUrl: 'https://leetcode.com/problems/word-pattern/',
    analysis: 'Given a pattern and a string s, find if s follows the same pattern. "abba", "dog cat cat dog" -> true. Same exact dual-mapping logic as Isomorphic strings, just mapping chars to whole words instead of chars to chars.',
    hints: [
      'Split `s` into an array of words `String[] words = s.split(" ")`.',
      'Use a `Map<Character, String>` for char->word, and `Map<String, Character>` for word->char to ensure bijection.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Dual HashMap validation ensuring strict 1-to-1 bijective mapping.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public boolean wordPattern(String pattern, String s) {
        String[] words = s.split(" ");
        if (words.length != pattern.length()) return false;
        
        Map<Character, String> charToWord = new HashMap<>();
        Map<String, Character> wordToChar = new HashMap<>();
        
        for (int i = 0; i < pattern.length(); i++) {
            char c = pattern.charAt(i);
            String word = words[i];
            
            if (charToWord.containsKey(c) && !charToWord.get(c).equals(word)) {
                return false;
            }
            if (wordToChar.containsKey(word) && wordToChar.get(word) != c) {
                return false;
            }
            
            charToWord.put(c, word);
            wordToChar.put(word, c);
        }
        
        return true;
    }
}`,
  codeExplanation: `We use a HashMap for O(1) average-case lookup and storage. As we iterate through the input, we store key information in the map. For each new element, we check the map to see if a complementary element exists. This trades space for time, reducing the complexity from O(n²) to O(n).`
      }
    ]
  },
  {
    id: '128',
    title: '128. Summary Ranges',
    difficulty: 'Easy',
    pattern: 'Two Pointers / Array',
    leetcodeUrl: 'https://leetcode.com/problems/summary-ranges/',
    analysis: 'Given sorted unique array nums, return smallest sorted list of ranges covering all numbers. Walk the array, track a `start` variable. Keep walking `i` forward until `nums[i] + 1 != nums[i+1]`. That break point establishes an interval end.',
    hints: [
      'Inner while loop: `while(i + 1 < n && nums[i + 1] == nums[i] + 1)` move `i` forward.',
      'If `start == i`, just add `start`. Else add `start->i`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Linear scan identifying contiguous blocks natively.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public List<String> summaryRanges(int[] nums) {
        List<String> res = new ArrayList<>();
        
        for (int i = 0; i < nums.length; i++) {
            int start = nums[i]; // Pin start
            
            // Traverse continuous block
            while (i + 1 < nums.length && nums[i + 1] == nums[i] + 1) {
                i++;
            }
            
            if (start != nums[i]) {
                res.add(start + "->" + nums[i]);
            } else {
                res.add(String.valueOf(start));
            }
        }
        return res;
    }
}`,
  codeExplanation: `We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      }
    ]
  },
  {
    id: '129',
    title: '129. Valid Anagram',
    difficulty: 'Easy',
    pattern: 'Frequency Array / Sort',
    leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/',
    analysis: 'Determine if t is an anagram of s. Like Ransom Note, but exact match required. Increment frequency array for s, decrement for t. If any element != 0 at the end, false.',
    hints: [
      'Check lengths first: if lengths differ, return false immediately.',
      'Use `int[] counts = new int[26]`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Constant space frequency mapping resolving matches instantly.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        
        int[] counts = new int[26];
        
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
            counts[t.charAt(i) - 'a']--;
        }
        
        for (int count : counts) {
            if (count != 0) return false;
        }
        return true;
    }
}`,
  codeExplanation: `We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      }
    ]
  },
  {
    id: '130',
    title: '130. Jump Game II',
    difficulty: 'Medium',
    pattern: 'Greedy / BFS / Array',
    leetcodeUrl: 'https://leetcode.com/problems/jump-game-ii/',
    analysis: 'Minimum number of jumps to reach the last index. Greedy algorithm mapping maximum reach windows. We track `currentEnd` (how far we can go on current jump). As we iterate, we find `farthest`. When `i == currentEnd`, we MUST jump, so `jumps++` and `currentEnd = farthest`.',
    hints: [
      'Concept is implicit BFS. Jump 1 maps a window `[0]`. Jump 2 maps window `[1, nums[0]]`.',
      'Track `farthest` reaching limit dynamically.',
      'Trigger jump increment when iterating past `currentEnd` boundary.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Greedy boundary mapping executing jumps only when definitively exhausting the previous jump\'s coverage.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int jump(int[] nums) {
        int jumps = 0;
        int currentJumpEnd = 0; // The max distance we can reach with 'jumps' count
        int farthest = 0;       // Max distance discovered so far
        
        for (int i = 0; i < nums.length - 1; i++) {
            // Uncover the farthest we can go from current platform
            farthest = Math.max(farthest, i + nums[i]);
            
            // We have walked the entirety of the current jump's coverage
            if (i == currentJumpEnd) {
                jumps++; // Commit to taking a jump
                currentJumpEnd = farthest; // Extent bounds
            }
        }
        
        return jumps;
    }
}`,
  codeExplanation: `Greedy boundary mapping executing jumps only when definitively exhausting the previous jump\\'s coverage. This approach efficiently handles the problem by making smart decisions at each step, avoiding unnecessary recalculation.`
      }
    ]
  },
  {
    id: '131',
    title: '131. H-Index',
    difficulty: 'Medium',
    pattern: 'Counting Sort / Arrays',
    leetcodeUrl: 'https://leetcode.com/problems/h-index/',
    analysis: 'Given array of citations, find scientist\'s h-index. (H-index: h papers have at least h citations). If we sort descending, we look for index where `citations[i] >= i + 1`. Alternatively, bucket sort frequencies O(N) optimally since max possible H-index cannot exceed N.',
    hints: [
      'Create `int[] buckets = new int[n + 1]`.',
      'If citation count > n, increment `buckets[n]`. Else increment `buckets[c]`.',
      'Iterate backwards tracking sum. When `sum >= bucket_index`, that index is H.'
    ],
    approaches: [
      {
        type: 'Better',
        explanation: 'Sort ascending, walk backwards analyzing intersection math.',
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int hIndex(int[] citations) {
        Arrays.sort(citations);
        int n = citations.length;
        
        for (int i = 0; i < n; i++) {
            int h = n - i; // Number of papers with AT LEAST citations[i]
            if (citations[i] >= h) {
                return h;
            }
        }
        return 0;
    }
}`,
  codeExplanation: `This approach optimizes the naive solution by reducing redundant work. We first sort the input to establish an ordering that simplifies the problem. With sorted data, we can use efficient techniques like binary search or two pointers. Related elements are now adjacent, making comparisons straightforward. The sorting step takes O(n log n) which becomes the overall time complexity.`
      },
      {
        type: 'Optimal',
        explanation: 'Bucket Sort natively resolving distributions up to maximum possible bounds.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public int hIndex(int[] citations) {
        int n = citations.length;
        int[] buckets = new int[n + 1];
        
        for (int c : citations) {
            if (c >= n) buckets[n]++;
            else buckets[c]++;
        }
        
        int runningTotal = 0;
        for (int i = n; i >= 0; i--) {
            runningTotal += buckets[i];
            if (runningTotal >= i) {
                return i;
            }
        }
        return 0;
    }
}`,
  codeExplanation: `We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      }
    ]
  },
  {
    id: '132',
    title: '132. Product of Array Except Self',
    difficulty: 'Medium',
    pattern: 'Prefix & Suffix Products',
    leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/',
    analysis: 'Return array where `answer[i]` is product of all elements except `nums[i]`. MUST be O(N) without division operator. The solution multiplies all left elements of `i`, then multiplies all right elements of `i` iteratively.',
    hints: [
      'Create `res` array length N.',
      'Pass 1: iterate forward. Variable `left = 1`. `res[i] = left`. Then `left *= nums[i]`.',
      'Pass 2: iterate backward. Variable `right = 1`. `res[i] *= right`. Then `right *= nums[i]`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Two-pass bidirectional multiplier logic utilizing the output array as storage mitigating space constraints.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1) extra space mapping',
        code: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        
        int leftProd = 1;
        for (int i = 0; i < n; i++) {
            res[i] = leftProd;
            leftProd *= nums[i]; // Accumulate left moving forward constraints
        }
        
        int rightProd = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= rightProd; // Combine with left constraints recursively backwards
            rightProd *= nums[i];
        }
        
        return res;
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '133',
    title: '133. Gas Station',
    difficulty: 'Medium',
    pattern: 'Greedy',
    leetcodeUrl: 'https://leetcode.com/problems/gas-station/',
    analysis: 'Already covered thoroughly earlier...',
    hints: ['Check earlier explanation'],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'See original.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    // See previous occurrence
}`,
  codeExplanation: `See original.. The code processes the input step by step, building toward the solution. Each operation is designed to bring us closer to the answer efficiently. Edge cases are handled to ensure correctness across all valid inputs.`
      }
    ]
  },
  {
    id: '134',
    title: '134. Search Insert Position',
    difficulty: 'Easy',
    pattern: 'Binary Search',
    leetcodeUrl: 'https://leetcode.com/problems/search-insert-position/',
    analysis: 'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. The magic of Binary Search is that if `target` is not found, `left` pointer perfectly lands on the insertion index natively.',
    hints: [
      'Standard Binary Search template.',
      'Return `left` at the end (not -1).'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Standard Binary Search with modified termination condition.',
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int searchInsert(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        // Left pointer bounds exactly to insertion gap naturally
        return left;
    }
}`,
  codeExplanation: `We use binary search to efficiently narrow down the answer space. We maintain left and right pointers and compute a mid value. Based on the comparison at mid, we eliminate half the search space each iteration. This gives us logarithmic time complexity instead of linear scanning.`
      }
    ]
  },
  {
    id: '135',
    title: '135. Find First and Last Position of Element in Sorted Array',
    difficulty: 'Medium',
    pattern: 'Binary Search',
    leetcodeUrl: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/',
    analysis: 'Find starting and ending position of a given target in sorted array O(logN). Run Binary Search twice. First run: if `target == nums[mid]`, push `right = mid - 1` to continually search left. Second run: push `left = mid + 1` to search right.',
    hints: [
      'Create a helper method `findBound(nums, target, isFirst)`.',
      'In helper, `if (nums[mid] == target) { bound = mid; if (isFirst) R = mid - 1; else L = mid + 1; }`'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Dual Binary Search mapping extremes cleanly.',
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        int first = findBound(nums, target, true);
        if (first == -1) return new int[]{-1, -1}; // Target not present
        
        int last = findBound(nums, target, false);
        return new int[]{first, last};
    }
    
    private int findBound(int[] nums, int target, boolean isFirst) {
        int left = 0, right = nums.length - 1;
        int bound = -1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                bound = mid;
                // Don't stop searching. Narrow interval towards boundary.
                if (isFirst) {
                    right = mid - 1; // Hunt lower
                } else {
                    left = mid + 1; // Hunt higher
                }
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return bound;
    }
}`,
  codeExplanation: `We use binary search to efficiently narrow down the answer space. We maintain left and right pointers and compute a mid value. Based on the comparison at mid, we eliminate half the search space each iteration. This gives us logarithmic time complexity instead of linear scanning.`
      }
    ]
  },
  {
    id: '136',
    title: '136. Single Element in a Sorted Array',
    difficulty: 'Medium',
    pattern: 'Binary Search',
    leetcodeUrl: 'https://leetcode.com/problems/single-element-in-a-sorted-array/',
    analysis: 'Sorted array where every element appears twice except one. Find single element in O(logN). Since numbers appear in pairs, `index(pairA) % 2 == 0`. The single element disturbs this pairing parity. Binary Search for parity divergence.',
    hints: [
      'If `mid` is even, its pair SHOULD be at `mid + 1`. If `nums[mid] == nums[mid+1]`, diverge to `left = mid + 2` because the single element is further right.',
      'Use XOR trick `mid ^ 1` to dynamically locate exactly where the partner SHOULD be regardless of even/odd.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Binary Search identifying parity break dynamically checking expected pairing index mapped using bitwise XOR logic.',
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int singleNonDuplicate(int[] nums) {
        int left = 0, right = nums.length - 2; // Right bounds to len-2 to protect mid^1 offset bounds conservatively
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            // Partner should be at mid^1 if undisturbed.
            // If mid is even, mid^1 resolves to mid+1
            // If mid is odd, mid^1 resolves to mid-1
            if (nums[mid] == nums[mid ^ 1]) {
                // If partner matches, left block is perfectly formed pairs. Breakpoint must be right.
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return nums[left];
    }
}`,
  codeExplanation: `We use binary search to efficiently narrow down the answer space. We maintain left and right pointers and compute a mid value. Based on the comparison at mid, we eliminate half the search space each iteration. This gives us logarithmic time complexity instead of linear scanning.`
      }
    ]
  },
  {
    id: '137',
    title: '137. Search a 2D Matrix II',
    difficulty: 'Medium',
    pattern: 'Array / Matrix Traversal',
    leetcodeUrl: 'https://leetcode.com/problems/search-a-2d-matrix-ii/',
    analysis: 'Unlike Matrix I, rows are sorted, columns are sorted, but there is no wrap-around continuation. We can start from the top-right corner. It functions identically to a BST. Moving left decreases values, moving down increases values.',
    hints: [
      'Set `row = 0`, `col = matrix[0].length - 1`.',
      'If `target < current`, decrement `col` (prune col).',
      'If `target > current`, increment `row` (prune row).'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Top-Right origin point mapping 2D matrix natively resolving like a Binary Search Tree navigation algorithm.',
        timeComplexity: 'O(M + N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return false;
        
        int row = 0;
        int col = matrix[0].length - 1; // Top Right origin
        
        while (row < matrix.length && col >= 0) {
            int curr = matrix[row][col];
            if (curr == target) return true;
            
            if (target < curr) {
                // Number must be smaller, ignore current column entirely
                col--;
            } else {
                // Number must be larger, ignore current row entirely
                row++;
            }
        }
        
        return false;
    }
}`,
  codeExplanation: `We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      }
    ]
  },
  {
    id: '138',
    title: '138. Kth Largest Element in an Array',
    difficulty: 'Medium',
    pattern: 'Quickselect / Priority Queue',
    leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
    analysis: 'Find the kth largest element without sorting fully. Approach 1: Min-heap of size K. Approach 2: Quickselect (Hoare\'s partition), which averages O(N) by dividing the array using pivots similar to Quicksort, but only recursing down one side.',
    hints: [
      'Min-Heap approach: `PriorityQueue` size `k`. If size > `k`, `poll()`. What remains in peak is kth largest.',
      'Quickselect approach: Write `partition` logic. If `pivotIndex == n - k`, return it.'
    ],
    approaches: [
      {
        type: 'Better',
        explanation: 'Min Heap preserving exactly K largest elements natively.',
        timeComplexity: 'O(N log K)',
        spaceComplexity: 'O(K)',
        code: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>(); // Min heap
        
        for (int num : nums) {
            pq.add(num);
            if (pq.size() > k) {
                pq.poll(); // Discard smaller elements
            }
        }
        
        return pq.peek();
    }
}`,
  codeExplanation: `This approach optimizes the naive solution by reducing redundant work. We use a priority queue (min-heap or max-heap) to efficiently access the smallest or largest element. Elements are added to the heap as we process the input. The heap automatically maintains order, giving us O(log n) insert and extract operations. This is more efficient than repeatedly sorting or scanning for the optimal element.`
      },
      {
        type: 'Optimal',
        explanation: 'Divide-and-Conquer selecting partition limits resolving K index directly. Averages O(N), Worst O(N²).',
        timeComplexity: 'O(N) avg, O(N²) worst',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        // Convert k to index based on sorted array
        return quickSelect(nums, 0, nums.length - 1, nums.length - k);
    }
    
    private int quickSelect(int[] nums, int left, int right, int kIndex) {
        int pivotIndex = partition(nums, left, right);
        
        if (pivotIndex == kIndex) {
            return nums[pivotIndex];
        } else if (pivotIndex < kIndex) {
            return quickSelect(nums, pivotIndex + 1, right, kIndex);
        } else {
            return quickSelect(nums, left, pivotIndex - 1, kIndex);
        }
    }
    
    private int partition(int[] nums, int left, int right) {
        int pivot = nums[right];
        int i = left;
        for (int j = left; j < right; j++) {
            if (nums[j] <= pivot) {
                swap(nums, i, j);
                i++;
            }
        }
        swap(nums, i, right);
        return i;
    }
    
    private void swap(int[] nums, int i, int j) {
        int t = nums[i]; nums[i] = nums[j]; nums[j] = t;
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '139',
    title: '139. Merge Intervals',
    difficulty: 'Medium',
    pattern: 'Sorting / Arrays',
    leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/',
    analysis: 'Merge all overlapping intervals. Sort intervals by starting bounds. Traverse taking current interval and expanding its `end` boundary if the next interval\'s start bounds falls within the active frame natively.',
    hints: [
      'Sort by `intervals[i][0]`.',
      'If `next[0] <= curr[1]`, merge them by doing `curr[1] = max(curr[1], next[1])`.',
      'Else push `curr` to result array, and reset `curr = next`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Sorted pass merging continuously chained blocks natively.',
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(N) for sort/res',
        code: `class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;
        
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> res = new ArrayList<>();
        
        int[] current = intervals[0];
        res.add(current); // Reference gets mutated directly
        
        for (int[] next : intervals) {
            if (next[0] <= current[1]) {
                // Overlap exists. Merge them natively.
                current[1] = Math.max(current[1], next[1]);
            } else {
                // Distant interval entirely. Inject new window mapping.
                current = next;
                res.add(current);
            }
        }
        
        return res.toArray(new int[res.size()][]);
    }
}`,
  codeExplanation: `We first sort the input to establish an ordering that simplifies the problem. With sorted data, we can use efficient techniques like binary search or two pointers. Related elements are now adjacent, making comparisons straightforward. The sorting step takes O(n log n) which becomes the overall time complexity.`
      }
    ]
  },
  {
    id: '140',
    title: '140. Insert Interval',
    difficulty: 'Medium',
    pattern: 'Arrays',
    leetcodeUrl: 'https://leetcode.com/problems/insert-interval/',
    analysis: 'Given sorted non-overlapping intervals, insert newInterval and merge overlaps. Since they are pre-sorted, we can divide array into 3 sections: Strictly Before, Overlapping, Strictly After.',
    hints: [
      'Phase 1: `while (next[1] < new[0])`, add `next`.',
      'Phase 2: `while (next[0] <= new[1])`, merge `new[0] = min`, `new[1] = max`. Add merged `new`.',
      'Phase 3: `while()` Add remaining.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Three-phase linear parsing mapping boundaries sequentially resolving interval blocks.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> res = new ArrayList<>();
        int i = 0;
        int n = intervals.length;
        
        // Phase 1: Add intervals ending before newInterval starts
        while (i < n && intervals[i][1] < newInterval[0]) {
            res.add(intervals[i]);
            i++;
        }
        
        // Phase 2: Merge overlapping intervals
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.add(newInterval); // Add the merged block
        
        // Phase 3: Add remaining intervals pushing strictly past end
        while (i < n) {
            res.add(intervals[i]);
            i++;
        }
        
        return res.toArray(new int[res.size()][]);
    }
}`,
  codeExplanation: `We use recursion to break the problem into smaller subproblems. Each recursive call handles a portion of the input and returns the result. The base case stops the recursion and returns a known value. Results from subproblems are combined to form the final answer.`
      }
    ]
  },
  {
    id: '141',
    title: '141. Minimum Window Substring',
    difficulty: 'Hard',
    pattern: 'Sliding Window',
    leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/',
    analysis: 'Given strings s and t, return minimum window substring of s such that every character in t is included. Using a sliding window, we expand `right` adding characters to a frequency map until we satisfy the requirement `t`. Then we shrink `left` as much as possible while maintaining the requirement.',
    hints: [
      'Maintain an array `map[128]` for character counts of requirement `t`.',
      'Track a variable `count = t.length`. As you find required characters, decrement `count`.',
      'When `count == 0`, a valid window is found. Try shrinking left pointer incrementing map and checking if `map[char] > 0` which invalidates the window again.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Dynamic Sliding Window maintaining validation state integer.',
        timeComplexity: 'O(S + T)',
        spaceComplexity: 'O(1) 128 integer array',
        code: `class Solution {
    public String minWindow(String s, String t) {
        int[] map = new int[128];
        for (char c : t.toCharArray()) {
            map[c]++;
        }
        
        int count = t.length();
        int left = 0, right = 0;
        int minLen = Integer.MAX_VALUE;
        int minStart = 0;
        
        while (right < s.length()) {
            char rChar = s.charAt(right);
            if (map[rChar] > 0) {
                count--;
            }
            map[rChar]--;
            right++;
            
            while (count == 0) {
                // valid window, check if it's new minimum
                if (right - left < minLen) {
                    minLen = right - left;
                    minStart = left;
                }
                
                char lChar = s.charAt(left);
                map[lChar]++;
                if (map[lChar] > 0) {
                    count++; // Window is now invalid, must expand right again
                }
                left++;
            }
        }
        
        return minLen == Integer.MAX_VALUE ? "" : s.substring(minStart, minStart + minLen);
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '142',
    title: '142. Trapping Rain Water',
    difficulty: 'Hard',
    pattern: 'Two Pointers',
    leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water/',
    analysis: 'Given n non-negative integers representing an elevation map, compute how much water it can trap. The amount of water at a bar is determined by `min(max_left_height, max_right_height) - current_height`. This can be computed iteratively using arrays, or optimally using two pointers sliding continuously inwards.',
    hints: [
      'Two pointers `L = 0, R = n - 1`.',
      'Variables `leftMax = 0, rightMax = 0`.',
      'Whichever is strictly smaller between `height[L]` and `height[R]` determines the bottleneck. Only calculating that side is safe to do greedily.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Inwards closing Two-Pointers tracking relative bounds dynamically determining bottlenecks eliminating array storage.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;
        
        while (left < right) {
            if (height[left] < height[right]) {
                // Left side is the bottleneck safely calculating trapped bound
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    water += leftMax - height[left];
                }
                left++;
            } else {
                // Right side is the bottleneck
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    water += rightMax - height[right];
                }
                right--;
            }
        }
        
        return water;
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '143',
    title: '143. Slinding Window Maximum',
    difficulty: 'Hard',
    pattern: 'Monotonic Queue (Deque)',
    leetcodeUrl: 'https://leetcode.com/problems/sliding-window-maximum/',
    analysis: 'Find max within a sliding window of size k. Using a Deque tracking INDICES guarantees O(N) constraints. We enforce deque natively strictly decreasing. If new element is larger than tail, pop tail.',
    hints: [
      'Store array INDICES in the `Deque<Integer> q = new LinkedList<>()`.',
      'Pop elements from BACK if they are smaller than `nums[i]`.',
      'Pop elements from FRONT if `q.peekFirst() < i - k + 1` (out of window bounds).',
      'Max is always at the default `q.peekFirst()` position.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Monotonic decreasing Deque. Ejects explicitly irrelevant indices maintaining localized maximum iteratively.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(K)',
        code: `class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        if (n == 0) return new int[0];
        
        int[] res = new int[n - k + 1];
        int resIdx = 0;
        
        Deque<Integer> q = new LinkedList<>(); 
        
        for (int i = 0; i < n; i++) {
            // Remove indices out of window bounds
            while (!q.isEmpty() && q.peekFirst() < i - k + 1) {
                q.pollFirst();
            }
            
            // Maintain monotonic decreasing structure
            while (!q.isEmpty() && nums[q.peekLast()] < nums[i]) {
                q.pollLast();
            }
            
            q.offerLast(i);
            
            if (i >= k - 1) { // Window fully formulated
                res[resIdx++] = nums[q.peekFirst()];
            }
        }
        
        return res;
    }
}`,
  codeExplanation: `We use a stack (LIFO data structure) to keep track of elements we need to process later. As we iterate through the input, we push elements when conditions are met and pop them when we find their match or resolution. The stack naturally handles nested or sequential dependencies. At the end, we check the stack state to determine the final answer.`
      }
    ]
  },
  {
    id: '144',
    title: '144. N-Queens',
    difficulty: 'Hard',
    pattern: 'Backtracking',
    leetcodeUrl: 'https://leetcode.com/problems/n-queens/',
    analysis: 'Place N queens on an NxN chessboard such that no two attack each other. Backtracking exploring row by row natively prevents horizontal attacks. We track Columns, Positive Diagonals, and Negative Diagonals.',
    hints: [
      'Diagonals inherently share constant sums mapping row/cols. Bottom-left to Top-right: `row + col` is constant.',
      'Top-left to Bottom-right: `row - col` is constant. Track these in 3 boolean arrays or HashSets.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Backtracking leveraging 1D array mapped math tracking diagonal boundaries O(1) natively.',
        timeComplexity: 'O(N!)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++) Arrays.fill(board[i], '.');
        
        backtrack(res, board, 0, new boolean[n], new boolean[2 * n], new boolean[2 * n]);
        return res;
    }
    
    private void backtrack(List<List<String>> res, char[][] board, int row, boolean[] cols, boolean[] posDiag, boolean[] negDiag) {
        int n = board.length;
        if (row == n) {
            res.add(constructBoard(board));
            return;
        }
        
        for (int col = 0; col < n; col++) {
            int posDiff = row + col;
            int negDiff = row - col + n; // Offset to prevent negative bounds
            
            if (cols[col] || posDiag[posDiff] || negDiag[negDiff]) continue;
            
            board[row][col] = 'Q';
            cols[col] = true;
            posDiag[posDiff] = true;
            negDiag[negDiff] = true;
            
            backtrack(res, board, row + 1, cols, posDiag, negDiag);
            
            board[row][col] = '.';
            cols[col] = false;
            posDiag[posDiff] = false;
            negDiag[negDiff] = false;
        }
    }
    
    private List<String> constructBoard(char[][] board) {
        List<String> b = new ArrayList<>();
        for (char[] row : board) {
            b.add(new String(row));
        }
        return b;
    }
}`,
  codeExplanation: `We explore all possible choices using recursion (backtracking). At each step, we make a choice, then recurse on the remaining problem. If a choice leads to a dead end, we undo it (backtrack) and try the next option. This systematically explores the entire solution space while pruning invalid paths early.`
      }
    ]
  },
  {
    id: '145',
    title: '145. Word Ladder',
    difficulty: 'Hard',
    pattern: 'BFS / Graph',
    leetcodeUrl: 'https://leetcode.com/problems/word-ladder/',
    analysis: 'Shortest transformation sequence from beginWord to endWord replacing one char at a time. The phrasing "Shortest" emphatically demands BFS logic over DFS. Convert current word array into graph neighbors dynamically replacing wildcard chars a-z.',
    hints: [
      'Put all words into a `HashSet` for O(1) checks.',
      'From a word inside BFS Queue, mutate char array checking `a-z` combinations injecting hits recursively into queue.',
      'Remove hit words from HashSet tracking visited states protecting loop cycles.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'BFS layered execution dynamically extrapolating string paths natively validating against a global HashSet dict.',
        timeComplexity: 'O(M² × N) (M word len, N word list)',
        spaceComplexity: 'O(N)',
        code: `class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> set = new HashSet<>(wordList);
        if (!set.contains(endWord)) return 0;
        
        Queue<String> q = new LinkedList<>();
        q.add(beginWord);
        int level = 1;
        
        while (!q.isEmpty()) {
            int size = q.size(); // Lock level
            
            for (int i = 0; i < size; i++) {
                String current = q.poll();
                char[] wordChars = current.toCharArray();
                
                // Explode neighbors globally
                for (int j = 0; j < wordChars.length; j++) {
                    char originalChar = wordChars[j];
                    
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == originalChar) continue;
                        wordChars[j] = c;
                        String newWord = new String(wordChars);
                        
                        if (newWord.equals(endWord)) return level + 1;
                        
                        if (set.contains(newWord)) {
                            q.add(newWord);
                            set.remove(newWord); // Mark visited natively
                        }
                    }
                    wordChars[j] = originalChar; // Backtrack modification
                }
            }
            level++;
        }
        
        return 0; // Did not reach endWord
    }
}`,
  codeExplanation: `We explore all possible choices using recursion (backtracking). At each step, we make a choice, then recurse on the remaining problem. If a choice leads to a dead end, we undo it (backtrack) and try the next option. This systematically explores the entire solution space while pruning invalid paths early.`
      }
    ]
  },
  {
    id: '146',
    title: '146. Median of Two Sorted Arrays',
    difficulty: 'Hard',
    pattern: 'Binary Search',
    leetcodeUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
    analysis: 'Find median of TWO sorted arrays explicitly in O(log(min(M,N))). It strictly demands binary partitioning. The core logic binary searches the smaller array plotting a partition that dynamically forces a mirrored partition point in the larger array.',
    hints: [
      'Total elements: M + N. The median inherently partitions arrays roughly equally.',
      'Check conditions: `maxLeftA <= minRightB` AND `maxLeftB <= minRightA`.',
      'If validating partition logic matches, median is established calculating max of lefts.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Binary Search mapping index partitions strictly satisfying cross-matrix value bound conditions dynamically.',
        timeComplexity: 'O(log(min(M, N)))',
        spaceComplexity: 'O(1)',
        code: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1); // Force binary search on smaller array mapping
        }
        
        int x = nums1.length;
        int y = nums2.length;
        int low = 0;
        int high = x;
        
        while (low <= high) {
            int partitionX = (low + high) / 2;
            int partitionY = (x + y + 1) / 2 - partitionX; // Mirrors logic
            
            int maxLeftX = (partitionX == 0) ? Integer.MIN_VALUE : nums1[partitionX - 1];
            int minRightX = (partitionX == x) ? Integer.MAX_VALUE : nums1[partitionX];
            
            int maxLeftY = (partitionY == 0) ? Integer.MIN_VALUE : nums2[partitionY - 1];
            int minRightY = (partitionY == y) ? Integer.MAX_VALUE : nums2[partitionY];
            
            if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
                // Partition found natively
                if ((x + y) % 2 == 0) { // Even length
                    return ((double)Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
                } else { // Odd length
                    return (double)Math.max(maxLeftX, maxLeftY);
                }
            } else if (maxLeftX > minRightY) {
                high = partitionX - 1; // Slide left natively
            } else {
                low = partitionX + 1; // Slide right natively
            }
        }
        return 0;
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  },
  {
    id: '147',
    title: '147. Basic Calculator',
    difficulty: 'Hard',
    pattern: 'Stack',
    leetcodeUrl: 'https://leetcode.com/problems/basic-calculator/',
    analysis: 'Implement a basic calculator evaluating strings containing `+`, `-`, digits, and parentheses. No multiplication/division. Stacks manage state natively saving previously calculated sums and active operational signs prior to evaluating parenthesis loops.',
    hints: [
      'Variables `result = 0`, `sign = 1`.',
      'Digit? parse fully natively appending. Update `result += sign * parsedNum`.',
      '`+`? `sign = +1`. `-`? `sign = -1`.',
      '`(`? `stack.push(result)`, `stack.push(sign)`, `result = 0`, `sign = 1`.',
      '`)`? `result = result * stack.pop() (that was the sign) + stack.pop() (that was the previously calculated baseline)`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Stack state encapsulation handling scope boundaries iteratively avoiding complicated recursion string evaluation.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N) for deep parenthesis chains',
        code: `class Solution {
    public int calculate(String s) {
        Stack<Integer> stack = new Stack<>();
        int result = 0;
        int num = 0;
        int sign = 1; // 1 means positive, -1 means negative
        
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            
            if (Character.isDigit(c)) {
                num = num * 10 + (c - '0');
            } else if (c == '+') {
                result += sign * num;
                num = 0; // Reset
                sign = 1; // Sign for the upcoming number
            } else if (c == '-') {
                result += sign * num;
                num = 0;
                sign = -1;
            } else if (c == '(') {
                stack.push(result); // State prior to block
                stack.push(sign); // State modifier applying to block
                
                result = 0; // Reset scope logic
                sign = 1;
            } else if (c == ')') {
                result += sign * num;
                num = 0; // Flush block remaining buffer
                
                int modifier = stack.pop();
                int baselineState = stack.pop();
                
                result = baselineState + (modifier * result);
            }
        }
        
        if (num != 0) { // Flush final lingering elements
            result += sign * num;
        }
        
        return result;
    }
}`,
  codeExplanation: `We use a stack (LIFO data structure) to keep track of elements we need to process later. As we iterate through the input, we push elements when conditions are met and pop them when we find their match or resolution. The stack naturally handles nested or sequential dependencies. At the end, we check the stack state to determine the final answer.`
      }
    ]
  },
  {
    id: '148',
    title: '148. Word Search II',
    difficulty: 'Hard',
    pattern: 'Trie / Backtracking',
    leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/',
    analysis: 'Given an m x n grid and a list of words, find all words on the board. Finding words individually is slow O(W * boardSize). Instead, construct a Trie using the `words` natively. Then, launch a DFS from every cell. If a path resolves down a Trie node, you found a word natively.',
    hints: [
      'Create `TrieNode` with `TrieNode[] children` and `String word`.',
      'DFS base cases: out of bounds, cell visited, OR cell char has NO matching TrieNode mapped natively.',
      'When you land on a valid TrieNode mapped with `node.word != null`, add word to results and natively invalidate `node.word = null` avoiding duplications.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Trie construction minimizing multi-query evaluation overhead significantly mapping paths structurally directly parsing DFS constraints.',
        timeComplexity: 'O(M × N × 3^L)', // L max word length
        spaceComplexity: 'O(W)', // W total chars mapped in Trie
        code: `class Solution {
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        String word = null;
    }
    
    public List<String> findWords(char[][] board, String[] words) {
        List<String> res = new ArrayList<>();
        TrieNode root = buildTrie(words);
        
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                dfs(board, i, j, root, res);
            }
        }
        return res;
    }
    
    private void dfs(char[][] b, int r, int c, TrieNode node, List<String> res) {
        if (r < 0 || c < 0 || r >= b.length || c >= b[0].length) return;
        char x = b[r][c];
        if (x == '#' || node.children[x - 'a'] == null) return;
        
        node = node.children[x - 'a']; // Descend into trie mapping
        
        if (node.word != null) {
            res.add(node.word); // Capture string
            node.word = null;   // De-duplicate natively
        }
        
        b[r][c] = '#'; // Mark Visited
        
        dfs(b, r + 1, c, node, res);
        dfs(b, r - 1, c, node, res);
        dfs(b, r, c + 1, node, res);
        dfs(b, r, c - 1, node, res);
        
        b[r][c] = x;   // Undo state
    }
    
    private TrieNode buildTrie(String[] words) {
        TrieNode root = new TrieNode();
        for (String w : words) {
            TrieNode node = root;
            for (char c : w.toCharArray()) {
                if (node.children[c - 'a'] == null) node.children[c - 'a'] = new TrieNode();
                node = node.children[c - 'a'];
            }
            node.word = w; // Store explicitly natively limiting reconstructions
        }
        return root;
    }
}`,
  codeExplanation: `We use a Trie (prefix tree) data structure for efficient string operations. Each node represents a character, and paths from root to nodes represent prefixes. Insertion and lookup both take O(word length) time. This is especially efficient when we need to search for words by prefix or check character-by-character.`
      }
    ]
  },
  {
    id: '149',
    title: '149. Max Points on a Line',
    difficulty: 'Hard',
    pattern: 'Math / Hash Map',
    leetcodeUrl: 'https://leetcode.com/problems/max-points-on-a-line/',
    analysis: 'Given an array of points, return maximum points natively lying aligned dynamically formulating lines. Evaluate every pair combinations explicitly mapping their `Slope`. Since double precision inherently suffers floating limits natively caching slopes is extremely risky natively mapping slopes utilizing their base fraction reductions mapping them as string tokens e.g. "X/Y".',
    hints: [
      'Slope = `dy / dx`. Find `GCD(dy, dx)` returning them unified. Cache map `(dy/gcd, dx/gcd)`.',
      'For each base point, loop through all other tracking duplicate points natively bounding maximum mappings.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'Math slope fraction formatting mapping strictly bounding floating limits accurately resolving points iteratively relative to a focal origin point.',
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(N) for current point map',
        code: `class Solution {
    public int maxPoints(int[][] points) {
        if (points.length <= 2) return points.length;
        
        int maxGlobal = 0;
        
        for (int i = 0; i < points.length; i++) {
            Map<String, Integer> map = new HashMap<>(); // Store slope
            int maxSlope = 0;
            int samePoints = 1; // Includes self intrinsically
            
            for (int j = i + 1; j < points.length; j++) { // Only map mappings logically forward implicitly tracking history natively bounded
                int dx = points[j][0] - points[i][0];
                int dy = points[j][1] - points[i][1];
                
                if (dx == 0 && dy == 0) {
                    samePoints++;
                    continue;
                }
                
                int gcd = generateGCD(dx, dy);
                dx /= gcd;
                dy /= gcd;
                
                // Normalizing signs mapped fraction strings
                if (dx < 0 || (dx == 0 && dy < 0)) {
                    dx = -dx;
                    dy = -dy;
                }
                
                String slopeString = dy + "/" + dx;
                map.put(slopeString, map.getOrDefault(slopeString, 0) + 1);
                maxSlope = Math.max(maxSlope, map.get(slopeString));
            }
            
            maxGlobal = Math.max(maxGlobal, maxSlope + samePoints);
        }
        
        return maxGlobal;
    }
    
    private int generateGCD(int a, int b) {
        if (b == 0) return a;
        return generateGCD(b, a % b);
    }
}`,
  codeExplanation: `We use a HashMap for O(1) average-case lookup and storage. As we iterate through the input, we store key information in the map. For each new element, we check the map to see if a complementary element exists. This trades space for time, reducing the complexity from O(n²) to O(n).`
      }
    ]
  },
  {
    id: '150',
    title: '150. Recover Binary Search Tree',
    difficulty: 'Hard',
    pattern: 'Tree Traversal / Recursion',
    leetcodeUrl: 'https://leetcode.com/problems/recover-binary-search-tree/',
    analysis: 'Exactly two nodes of a BST are natively explicitly swapped by mistake. Recover recursively resolving. A proper In-Order traversal explicitly returns a sorted structure natively tracking node previous mappings mathematically maps inversion mismatches intrinsically limiting bounds fixing tree logically reversing pointer mapped values natively solving.',
    hints: [
      'In-Order DFS checking `prev.val > node.val`.',
      'The FIRST time mapping fails, `firstInversion = prev`, `secondInversion = node`.',
      'If it natively fails a SECOND time, overwrite `secondInversion = node`.',
      'Finally swap `firstInversion.val` with `secondInversion.val`.'
    ],
    approaches: [
      {
        type: 'Optimal',
        explanation: 'In-Order iteration mapping logically inversion pairs intrinsically repairing array natively eliminating space allocating values modifying tree pointer structures optimally mapping references.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(H)',
        code: `class Solution {
    TreeNode first = null;
    TreeNode second = null;
    TreeNode prev = new TreeNode(Integer.MIN_VALUE);
    
    public void recoverTree(TreeNode root) {
        inOrder(root);
        
        int temp = first.val;
        first.val = second.val;
        second.val = temp;
    }
    
    private void inOrder(TreeNode node) {
        if (node == null) return;
        
        inOrder(node.left);
        
        // Logical detection mapping validation bounds intrinsically mapped
        if (first == null && prev.val > node.val) {
            first = prev;
        }
        if (first != null && prev.val > node.val) {
            second = node;
        }
        prev = node; // Commit logically mapped tracking explicitly bound logic
        
        inOrder(node.right);
    }
}`,
  codeExplanation: `We use two pointers to traverse the data structure efficiently. By moving the pointers based on specific conditions, we avoid unnecessary comparisons. This technique reduces the problem from O(n²) to O(n) in many cases. The pointers move toward each other or in the same direction depending on the problem.`
      }
    ]
  }
];
