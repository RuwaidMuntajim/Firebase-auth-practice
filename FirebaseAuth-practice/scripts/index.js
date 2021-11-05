// reference
const dreamDiv = document.querySelector('.dream-list');
const dreamList = document.querySelector('.dreamList');
const form = document.querySelector('.form');
const dreamForm = document.querySelector('.dreamForm');
const dreamFormDiv = document.querySelector('.dream-form');


const deleteDoc = (id) => {
    db.collection('dreamList').doc(id).delete();
}

const renderDream = (docs) => {
    let html = '';
    if (docs) {
        
        docs.forEach(doc => {
            const title = doc.data().Title;
            const content = doc.data().Content;
            const creator = doc.data().Creator;
            let li = `
                <li data-id="${doc.id}" class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                    <div>${title}</div>
                    <div>${content}</div>
                    <div>Created by ${creator}</div>
                    <div onClick="deleteDoc('${doc.id}')">x</div>
                </li>
            `
            html += li;
        })
    }

    dreamList.innerHTML = html;

}


const renderUI = (user) => {
    if (user) {
        form.style.display = 'none';
        dreamFormDiv.style.display = 'block';
        db.collection('dreamList').onSnapshot(snapshot => {
            renderDream(snapshot.docs);
        })
    } else {
        form.style.display = 'block';
        dreamFormDiv.style.display = 'none';
        renderDream();
    }
}
const dreamFormInteraction = (user) => {
    dreamForm.addEventListener('submit', (e) => {
        e.preventDefault();
        db.collection('dreamList').add({
            Title: dreamForm['title'].value,
            Content: dreamForm['content'].value,
            Creator: user.email
        })
        dreamForm['title'].value = "";
        dreamForm['content'].value = "";
    })
}


