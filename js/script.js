var BASE_URL='https://vinylcollectionbackend.herokuapp.com/'

$(document).ready(function() {

    loadAlbums()
  //hover state
  deleteAlbum()
  searchDiscogs()
  addAlbum()

//Search Discogs for albums
function searchDiscogs() {
  $('.discogs-form').on('submit', function(e) {
    e.preventDefault();
    $('h3.one').show();
    $
    var apiSearch = $('.discogs-input').val()
    $.ajax({
      url:'https://api.discogs.com/database/search?artist=' + apiSearch + '&key=jbUTpFhLTiyyHgLRoBgq&secret=LSQDaLpplgcCGlkzujkHyUkxImNlWVoI',
      method: 'GET',
    }).done(function(data) {
      $('.discogs-input').val(' ').focus()
      // console.log(data.results[10]);
      //populate list of bands w/ albums
      for (var i = 0; i < data.results.length; i++) {
        var div = $('<div></div>');
        var p = $('<p></p>');
        var newFirst = data.results[i].reverse();
        div.html('<img src="' + newFirst.thumb + '" />');
        p.html(newFirst.title);
        div.append(p);
        var a = $('<a><span class="icon-plus2"></span></a>');
        a.hover(function() {

        })      
        a.attr('href',BASE_URL + 'albums/');   
        a.data('artist', newFirst.artist);
        a.data('album', newFirst.title);
        a.data('year', newFirst.year);
        a.data('art', newFirst.thumb);
        a.addClass('addAlbum');    
        div.append(a);    
         $('.search-results').append(div);
      //make them clickable
      //add to database/local library

    }
    })
  })
};

//add album to library
function addAlbum() {
  $(document).on('click', 'a.addAlbum', function(e) {
     e.preventDefault()
     var link = $(this)
     $.ajax({
       url: link.attr('href'),
       method: 'POST',
        data: {
          artist:link.data('artist'),
          album: link.data('album'),
          year: link.data('year'),
          art: link.data('art')
        }
     })
     .done(function() {
        loadAlbums()
        link.parent('div').remove()
     })
   })
  }






//Search personal Catalog
// function searchLibrary() {
//
// }



function loadAlbums() {
  $('.collection').empty()
  $.ajax({
    url: BASE_URL + 'albums/',
   method: 'GET'
  }).done(function(albums) {
    albums.forEach(function(albums) {
      loadAlbum(albums)
 // console.log(albums);
    })
  })
}

function loadAlbum(album) {
  // console.log(album.album + ' ' + album.artist + ' ' + album.year);
  var div = $('<div></div>');
  var p = $('<p></p>');
    div.html('<img src="' + album.art + '" />');
    p.html(+ ' ' + album.album + ' ' + album.artist + ' ' + album.year)
    div.append(p);
    var a = $('<a><span class="icon-trash2"></span></a>');      
    a.attr('href',BASE_URL + 'albums/' + album._id);     a.addClass('deleteAlbum');    
    div.append(a);    
     $('.collection').append(div);
  //    div.addClass("cards");
  //    $('.cards').hover(function() {
  //    $(this).css({"font-family": "Open Sans, sans-serif", "font-weight": "600", "font-size": "24px", "color": "#f1eada", "background-color": "rgba(239,90,52,0.95)", "border-radius": "3px", "border": "1px solid #ef5a34","box-shadow": "1px", "z-index": "99" });
  //  });
    //  console.log(album);
}

function deleteAlbum() {
  $(document).on('click', 'a.deleteAlbum', function(e) {
    e.preventDefault()
    var link = $(this)
    $.ajax({
      url: link.attr('href'),
      method: 'DELETE'
    })
    .done(function () {
      link.parent('div').remove()
    })
   })
  }
});
