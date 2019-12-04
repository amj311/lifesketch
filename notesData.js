var notesData = [
    {
        id: "intro",
        title: "Overview",
        body: `
            <p>Welcome to the interactive timeline of the life of Robert Harris Jr!<p>
            <p>Robert was my sixth great-grandfather, on my mother's side, and among the very first of my ancestors to accept the restored gospel. He was born at the very beginning of the 19th century in the English countryside of Gloucestershire where he was a butcher, farmer, successful pugilist (boxer), and where he eventually married and was converted to the Church of Jesus Christ of Latter-Day Saints. After his conversion, he and his family joined the saints in Nauvoo, IL, suffered persecutions with them, and eventualy finished out his life along the Wasatch Front.</p>
            <p>While researching his life, I found a few different accounts written from the memories of his children and grandchildren, but almost nothing first-hand. This project represents my attempt to give him a voice and let him tell his story in his own words. I compiled information and stories from all of the accounts that I found and from them created a series of first-person journal entries which have been organized along a timeline of events with contextual and historical information.</p>
            <p>Names, dates, and events are all factual and supported by historical accounts, but the narrative has been reconstructed in places to read from the first-person and to provide an interpretation of what Robert may have thought and felt during pivotal moments of his life.</p>
        `
    },
    {
        id: "nav",
        title: "Navigation",
        body: `
            <ul>
                <li>Move through the timeline by scrolling left or right. Zoom in and out by scrolling up and down, or with the + and - buttons.</li>
                <li>Events with images can be expanded with the 🔍 button.</li>
                <li>Click on the 📜 icon to open the journal entry associated with an event.</li>
                <li>Journals can be viewed in either plain text or an handwritten page by toggling the 'Aa' button in the top left corner.</li>
                <li>Any menu or view can be exited with the &times; button or the ESC key.</li>
                <li><note ft onclick="app.openNote('nav')">Textual annotations</note> can be clicked to open the notes panel.</li>
            </ul>
        `
    },
    {
        id: "annotation",
        title: "Annotations",
        body: `
            <ul>
                <li>Move through the timeline by scrolling left or right. Zoom in and out by scrolling up and down, or with the + and - buttons.</li>
                <li>Events with images can be expanded with the 🔍 button.</li>
                <li>Click on the 📜 icon to open the journal entry associated with an event.</li>
                <li>Journals can be viewed in either plain text or an handwritten page by toggling the 'Aa' button in the top left corner.</li>
                <li>Any menu or view can be exited with the &times; button or the ESC key.</li>
                <li><note ft onclick="app.openNote('nav')">Textual annotations</note> can be clicked to open the notes panel.</li>
            </ul>
        `
    },
    {
        id: "letter_notes",
        title: "The Letter",
        body: `
            <p>Welcome to the interactive timeline of the life of Robert Harris Jr!<p>
        `
    }
]