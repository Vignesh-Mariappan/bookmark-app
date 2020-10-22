const modalContainer = document.querySelector('#modal-container');
const bookmarkContainer = document.querySelector('#bookmark-container');
const modalShow = document.querySelector('#modal-show');
const modalClose = document.querySelector('#close-modal');
const bookmarkFormSubmit = document.querySelector('.bookmark-form');
const websiteNameEl = document.querySelector('#website-name');
const websiteUrlEl = document.querySelector('#website-url');

let bookmarks = [];

// Show modal and focus on the first input
function showModal() {
    modalContainer.classList.add('show-modal');
    websiteNameEl.focus();
}

//Resetting the form values and closing the modal
function closeModal() {
    bookmarkFormSubmit.reset();
    modalContainer.classList.remove('show-modal')
}

//Storing the bookmark
function storeBookMark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes('http')) {
        urlValue = `https://${urlValue}`;
    }

    if(!validate(nameValue, urlValue)) {
        return false;
    }

    const bookmark = {
            name: nameValue,
            url: urlValue
    };

    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();

    bookmarkFormSubmit.reset();

    websiteNameEl.focus();
}

//Form validation
function validate(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if(!urlValue || !nameValue) {
        alert('Please submit both the fields');
        return false;
    }
    if(!urlValue.match(regex)) {
        alert('Please provide a valid Url');
        return false;
    }

    return true;
}

//Fetching bookmarks
function fetchBookmarks() {
    //Fetch the bookmarks from local storage only if it is available
    if(localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    } else {
        //Create one bookmarks array and store it in local storage
        bookmarks = [
            {
                name: 'Stack Overflow',
                url: 'https://stackoverflow.com'
            },
            {
                name: 'Sitepoint',
                url: 'https://www.sitepoint.com/'
            },
            {
                name: 'Smashing Magazine',
                url: 'https://www.smashingmagazine.com'
            },
            {
                name: 'Front End Front',
                url: 'https://frontendfront.com'
            },
            {
                name: 'Javascript - Developer mozilla',
                url: 'https://developer.mozilla.org/'
            },
            {
                name: 'Designer News',
                url: 'https://www.designernews.co/'
            },
            {
                name: 'Web Designer Depot',
                url: 'http://www.webdesignerdepot.com/'
            },
            {
                name: 'Codrops',
                url: 'http://tympanus.net/codrops/'
            },
            {
                name: 'Font Awesome',
                url: 'https://fontawesome.com/'
            },
            {
                name: 'UI Color Gradients Collection',
                url: 'https://uigradients.com/'
            },
        ]
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    buildBookmaks();
}


//Building bookmarks 
function buildBookmaks() {
    bookmarkContainer.textContent = '';
    bookmarks.forEach((bookmark) => {
        const { name, url } = bookmark;
        //item
        const bookmarkItem = document.createElement('div');
        bookmarkItem.classList.add('item');
        //delete icon
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('far', 'fa-trash-alt', 'delete-bookmark');
        deleteIcon.setAttribute('title', 'Delete Bookmark');
        deleteIcon.addEventListener('click', () => deleteBookmark(url));
        // favicon & link container 
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        //favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
        //link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;
        //appending elements together
        linkInfo.append(favicon, link);
        bookmarkItem.append(deleteIcon, linkInfo);
        bookmarkContainer.appendChild(bookmarkItem);
    });
}

//Deleting a bookmark
function deleteBookmark(url) {
    bookmarks.forEach((bookmark, i) => {
        if(bookmark.url === url) {
            bookmarks.splice(i, 1);
        }
    });

    //Update the local storage and repopulate the DOM
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

//Add event listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', closeModal);
window.addEventListener('click', ((e) => e.target.id === 'modal-container' ? modalContainer.classList.remove('show-modal') : false));
bookmarkFormSubmit.addEventListener('submit', storeBookMark);

//Onload
fetchBookmarks();
console.log(bookmarks);
