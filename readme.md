<h3><a href="#assignment" class="anchor-link">Assignment</a></h3>
  <p>Your task is to build a function <code>knightMoves</code> that shows the shortest possible way to get from one square to another by outputting all squares the knight will stop on along the way.</p>

  <p>You can think of the board as having 2-dimensional coordinates.  Your function would therefore look like:</p>

  <ul>
    <li><code>knightMoves([0,0],[1,2]) == [[0,0],[1,2]]</code></li>
    <li><code>knightMoves([0,0],[3,3]) == [[0,0],[1,2],[3,3]]</code></li>
    <li><code>knightMoves([3,3],[0,0]) == [[3,3],[1,2],[0,0]]</code></li>
  </ul>

  <div class="lesson-content__panel">
    <ol>
      <li>Put together a script that creates a game board and a knight.</li>
      <li>Treat all possible moves the knight could make as children in a tree.  Don’t allow any moves to go off the board.</li>
      <li>Decide which search algorithm is best to use for this case.  Hint: one of them could be a potentially infinite series.</li>
      <li>Use the chosen search algorithm to find the shortest path between the starting square (or node) and the ending square.  Output what that full path looks like, e.g.:</li>
    </ol>

   <pre>  &gt; knightMoves([3,3],[4,3])
  =&gt; You made it in 3 moves!  Here's your path:
    [3,3]
    [4,5]
    [2,4]
    [4,3]
<span aria-hidden="true" class="line-numbers-rows"><span></span><span></span><span></span><span></span><span></span><span></span></span></code></pre>
  </div>