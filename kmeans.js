/* Implementation of the k-means clustering algorithm.

Author: asal
Date: Friday, 29/09/2017
Time for development: 2 hours

First algorithm implemented in Javascript. So proud!!
*/

// k-means algorithm input
var N = 10000;	// points to cluster
var k = 20;	// number of clusters
var d = 4;	// the dimension of the points
var maximumNumberOfIterations = 100;
var minVal = 1; // minimum value of interval from which the random integer feature values are derived
var maxVal = 10; // maximum value of interval from which the random integer feature values are derived

// This function returns a random interger number in the interval [min, max]
function getRandomInteger(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Euclidean distance between 2 arrays of length d
function euclideanDistance(arr1, arr2)
{
    var dist = 0.0;
    for (var i = 0; i < d; i++)
        dist += Math.pow(arr1[i]-arr2[i], 2);
    return Math.sqrt(dist);
}

// Checks if 2 arrays have the same content elementwise
function haveTheSameContent(arr1, arr2)
{
    sameContent = true;
    var l = arr1.length < arr2.length ? arr1.length : arr2.length;
    for (var i = 0; i < l; i++)
    {
        if (arr1[i] != arr2[i])
        {
            sameContent = false;
            break;
        }
    }
    return sameContent;
}

// Checks if new centers are equal to the old centers for all the clusters
function isEnded(sameCenters)
{
    var isEnded = true;
    for (var i = 0; i < k; i++)
    {
        if (!sameCenters[i])
        {
            isEnded = false;
            break;
        }
    }
    return isEnded;
}

// Define the points
var points = [];
for (var i = 0; i < N; i++)
{
    var point = {id:i, vals:[]};
    for (var j = 0; j < d; j++)
    {
        var val = getRandomInteger(minVal, maxVal);
        point.vals.push(val);
    }
    points.push(point);
}

// Define the clusters
clusters = [];
sameCenters = [];
for (var i = 0; i < k; i++)
{
    var cluster = {id:i, c:points[i].vals, members:[]};    
    clusters.push(cluster);
    sameCenters.push(false);
}


var iteration = 0;
var ended = false;
do
{
    iteration++;
    //console.log(iteration);
    // Find distances of points from clusters' centers
    for (var i = 0; i < points.length; i++)
    {
        var minDist = 1000000.0;
        var minId = -1;
        var dist = -1;
        for (var j = 0; j < clusters.length; j++)
        {
            dist = euclideanDistance(points[i].vals, clusters[j].c);
            //console.log(d);
            if (dist < minDist)
            {
                minDist = d;
                minId = j;
            }
        }
        clusters[minId].members.push(points[i].id);
    }

    // Find new centers
    for (var i = 0; i < k; i++)
    {
        // new center
        var newCenter = [];
        for (var index1 = 0; index1 < d; index1++)
            newCenter.push(0.0);
        // for all the points of the cluster
        for (var index2 = 0; index2 < clusters[i].members.length; index2++)
        {
            for (var index3 = 0; index3 < d; index3++)
                newCenter[index3] += points[clusters[i].members[index2]].vals[index3];
        }

        for (var index4 = 0; index4 < d; index4++)
            newCenter[index4] /= clusters[i].members.length;

        // Check if new center equals old center and if not update old center with new
        if (haveTheSameContent(newCenter, clusters[i].c))
            sameCenters[i] = true;
        else
        {
            clusters[i].c = newCenter;
            clusters[i].members.length = 0;
        }
    }
    
    if ((!isEnded(sameCenters)) && (iteration < maximumNumberOfIterations))
    {
        for (index = 0; index < k; index++)
            sameCenters[index] = false;
    }
    else ended = true;
}
while(!ended);


// print results
//console.log('Allocation results:');
//console.log('PointID, ClusterID');
console.log('ClusterID, Number of points:');
for (var i = 0; i < k; i++)
{
    console.log(clusters[i].id, clusters[i].members.length);
    //for (var j = 0; j < clusters[i].members.length; j++)
        //console.log(clusters[i].members[j], clusters[i].id)
}
