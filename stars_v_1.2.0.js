var count = 0;

var starCount = 0;



// Function to display stars as per user mouseovers and clicks
function displayStars(num, point, width, height, idname, ratid, ratidin, ps, hs, fs) {
    
    var imag = "<span>";
    
    count++;
    
    document.getElementById(ratid).innerHTML = "0/"+num;
    
    for(var i = 0; i<num; i++) {
           imag += "<img src='"+ps+"' width="+width+" height="+height+" usemap='#"+i+"star"+count+"' id='"+i+"star"+count+"' alt='plain' />";
        
            if(point) {
                imag += "<map name='"+i+"star"+count+"'>";
                imag += "<area id='"+i+"star+"+count+"' shape='rect' coords='0,0,"+Math.floor(width/2)+","+Math.floor(height)+"' onmouseover='printData(\""+i+"star"+count+"\", "+i+", "+count+", "+point+", \""+ps+"\", \""+hs+"\", \""+fs+"\")' onmouseout='eraseData(\""+i+"star"+count+"\", "+i+", "+count+", \""+ps+"\", \""+hs+"\", \""+fs+"\")' onclick='setPermanent(\""+i+"star"+count+"\", "+i+", "+count+", "+num+", "+point+", \""+ratid+"\", \" "+ratidin+" \", \""+ps+"\", \""+hs+"\", \""+fs+"\")'/>";
                imag += "<area id='"+i+"star++"+count+"' shape='rect' coords='"+Math.floor(height/2)+",0,"+width+","+height+"' onmouseover='printData(\""+i+"star-"+count+"\", "+i+", "+count+", "+point+", \""+ps+"\", \""+hs+"\", \""+fs+"\")' onmouseout='eraseData(\""+i+"star-"+count+"\", "+i+", "+count+", \""+ps+"\", \""+hs+"\", \""+fs+"\")' onclick='setPermanent(\""+i+"star-"+count+"\", "+i+", "+count+", "+num+", "+point+", \""+ratid+"\", \" "+ratidin+" \", \""+ps+"\", \""+hs+"\", \""+fs+"\")'/>";
                imag += "</map>";
            } else {
                imag += "<map name='"+i+"star"+count+"'>";
                
                imag += "<area id='"+i+"star+"+count+"' shape='rect' coords='0,0,"+Math.floor(width)+","+Math.floor(height)+"' onmouseover='printData(\""+i+"star"+count+"\", "+i+", "+count+", "+point+", \""+ps+"\", \""+hs+"\", \""+fs+"\")' onmouseout='eraseData(\""+i+"star"+count+"\", "+i+", "+count+", \""+ps+"\", \""+hs+"\", \""+fs+"\")' onclick='setPermanent(\""+i+"star"+count+"\", "+i+", "+count+", "+num+", "+point+", \""+ratid+"\", \" "+ratidin+" \", \""+ps+"\", \""+hs+"\", \""+fs+"\")'/>";

                imag += "</map>";
            }
    }
    
    imag += "</span>";
    
    document.getElementById(idname).innerHTML = imag;
    
    return starCount;
}

// Function to set the stars permanent as per user clicks
function setPermanent(dat, snum, idnum, num, point, ratid, ratidin,ps,hs,fs) {
    
    starCount = 0;
    
    for(var i=0; i<num; i++) {
        
        id = i+"star"+idnum;
        id2 = i+"star+"+idnum;
        id3 = i+"star++"+idnum;
        if(i <= snum) {
            document.getElementById(id).src = fs;
            starCount += 1;
        }
        else {
            document.getElementById(id).src = ps;
        }
        
        document.getElementById(id2).onmouseout = undefined;
        document.getElementById(id2).onmouseover = undefined;
        
        if(point) {
            document.getElementById(id3).onmouseout = undefined;
            document.getElementById(id3).onmouseover = undefined;
        }
    }
    
    if(dat.search("-") == -1 && point) {
        document.getElementById(snum+"star"+idnum).src = hs;
        starCount -= 0.5;
    }
    
    document.getElementById(ratid).innerHTML = starCount+"/"+num;
    ratidin = ratidin.trim();
    document.getElementById(ratidin).value = starCount;
}

// Used to display the data from the user clicked rating
function printData(dat, snum, idnum, point,ps,hs,fs) {
    for(var i=0; i<=snum; i++) {
        id = i+"star"+idnum;
        document.getElementById(id).src = fs; 
    }
    
    if(dat.search("-") == -1 && point) {
        document.getElementById(snum+"star"+idnum).src = hs;
    }
}

// Internal function works with other functions to erase data accordingly
function eraseData(dat, snum, idnum,ps,hs,fs) {
    for(var i=0; i<=snum; i++) {
        id = i+"star"+idnum;
        document.getElementById(id).src = ps; 
    }
}

// Function used to permanently set data to stars and display it
function setStars(dat, height, width, rating, idname, ps, hs, fs) {

    var imag = "<span>";
    
    for(var i = 1; i<=dat; i++) {
        
        if(rating > 0.5) {
            imag += "<img src='"+fs+"' width="+width+" height="+height+" alt='plain' />";
            rating--;
        } else {
            if(rating > 0) {
                imag += "<img src='"+hs+"' width="+width+" height="+height+" alt='plain' />";
                rating--;
            } else {
                imag += "<img src='"+ps+"' width="+width+" height="+height+" alt='plain' />";
            }
        }
    }
    
    imag += "</span>";
    
    $("#"+idname).prepend(imag);
}

// This works on page load to load and set stars
$(document).ready(function() {
               
    var stars = document.getElementsByClassName("stars");
    
    for(var i = 0; i < stars.length; i++) {                 
        var id = document.getElementById(stars[i].id);
        var status = true;
    
        var ps = "https://dl.dropboxusercontent.com/u/77110529/ratingSystem/plainStar.png";
        var fs = "https://dl.dropboxusercontent.com/u/77110529/ratingSystem/fullStar.png";
        var hs = "https://dl.dropboxusercontent.com/u/77110529/ratingSystem/halfStar.png";
        
        if(id.getAttribute("data-starType") == "classic") {
            ps = "https://dl.dropboxusercontent.com/u/77110529/ratingSystem/aplainStar.png";
            hs = "https://dl.dropboxusercontent.com/u/77110529/ratingSystem/ahalfStar.png";
            fs = "https://dl.dropboxusercontent.com/u/77110529/ratingSystem/afullStar.png";
        }
        
        if(id.getAttribute("data-half") == "false") {
            status = false;
        }
        
        if(id.getAttribute("data-plainsrc") != null) {
            ps = id.getAttribute("data-plainsrc");
        }
        
        if(id.getAttribute("data-halfsrc") != null) {
            hs = id.getAttribute("data-halfsrc");
        }
        
        if(id.getAttribute("data-fullsrc") != null) {
            fs = id.getAttribute("data-fullsrc");
        }
        
        displayStars(id.getAttribute("data-starCount"),status,id.getAttribute("data-height"),id.getAttribute("data-width"),stars[i].id,id.getAttribute("data-ratingId"),id.getAttribute("data-hiddRating"),ps,hs,fs);
        
    }
    
    var stars = document.getElementsByClassName("getStars");

    for(var i = 0; i < stars.length; i++) {                 
        var id = document.getElementById(stars[i].id);
        
        var ps = "https://dl.dropboxusercontent.com/u/77110529/ratingSystem/plainStar.png";
        var fs = "https://dl.dropboxusercontent.com/u/77110529/ratingSystem/fullStar.png";
        var hs = "https://dl.dropboxusercontent.com/u/77110529/ratingSystem/halfStar.png";
        
        if(id.getAttribute("data-starType") == "classic") {
            ps = "https://dl.dropboxusercontent.com/u/77110529/ratingSystem/aplainStar.png";
            hs = "https://dl.dropboxusercontent.com/u/77110529/ratingSystem/ahalfStar.png";
            fs = "https://dl.dropboxusercontent.com/u/77110529/ratingSystem/afullStar.png";
        }
        
        if(id.getAttribute("data-plainsrc") != null) {
            ps = id.getAttribute("data-plainsrc");
        } 
        
        if(id.getAttribute("data-halfsrc") != null) {
            hs = id.getAttribute("data-halfsrc");
        }
        
        if(id.getAttribute("data-fullsrc") != null) {
            fs = id.getAttribute("data-fullsrc");
        }
        
        setStars(id.getAttribute("data-starCount"),id.getAttribute("data-height"),id.getAttribute("data-width"),id.getAttribute("data-rating"),stars[i].id,ps,hs,fs);
    } 
});