var notesData = [
{
    type: "note",
    elId: "intro",
    title: "Overview",
    body: `
        <p>Welcome to the interactive timeline of the life of Robert Harris Jr!<p>
        <p>Robert was my sixth great-grandfather, on my mother's side, and among the very first of my ancestors to accept the restored gospel. He was born at the very beginning of the 19th century in the English countryside of Gloucestershire where he was a butcher, farmer, successful pugilist (boxer), and where he eventually married and was converted to the Church of Jesus Christ of Latter-Day Saints. After his conversion, he and his family joined the saints in Nauvoo, IL, suffered persecutions with them, and eventualy finished out his life along the Wasatch Front.</p>
        <p>While researching his life, I found a few different accounts written from the memories of his children and grandchildren, but almost nothing first-hand. This project represents my attempt to give him a voice and let him tell his story in his own words. I compiled information and stories from all of the accounts that I found and from them created a series of first-person journal entries which have been organized along a timeline of events with contextual and historical information.</p>
        <p>Names, dates, and events are all factual and supported by historical accounts, but the narrative has been reconstructed in places to read from the first-person and to provide an interpretation of what Robert may have thought and felt during pivotal moments of his life.</p>
    `
},
{
    type: "note",
    elId: "nav",
    title: "Navigation",
    body: `
        <ul>
            <li>Move through the timeline by scrolling left or right. Zoom in and out by scrolling up and down, or with the &plus; and &minus; buttons.</li>
            <li>Events with images can be expanded with the 🔍 button.</li>
            <li>Click on the 📜 icon to open the journal entry associated with an event.</li>
            <li>Journals can be viewed in either plain text or an handwritten page by toggling the 'Aa' button in the top left corner.</li>
            <li>Any menu or view can be exited with the &times; button or the ESC key.</li>
            <li><note ft onclick="app.openNote('nav')">Textual annotations</note> can be clicked to open the notes panel.</li>
        </ul>
    `
},
{
    type: "note",
    elId: "annotation",
    title: "Annotations",
    body: `
        <p>To provide greater context to the reader, several types of annotations have been made, largely based on Becker's Six Principles of Contextual Relations:</p>
        <ul>
            <li><b>Structural:</b> part to whole relations; language relations within the text.</li>
            <li><b>Generic:</b> cross-textual relations; language relations with previous texts; genre relations. </li>
            <li><b>Medial:</b> relation of the text to its medium. This type of relation can be found regarding the letter to Hannah. Because of the nature of the letter, certain edits and explanations were made in this publication. The letter also helped to influence the writing style for Robert's fictional journal entries.</li>
            <li><b>Interpersonal:</b> relation of the texts to persons: reader, author, character, Deity, etc.</li>
            <li><b>Referential:</b> relation of the text to nature and the supernatural; real world and other world; signifier and signified.</li>
            <li><b>Silential:</b> relation of the text to what is not said; taboo; pause; omission; limitations of language.</li>
        </ul>
    `
},
{
    type: "note",
    elId: "style",
    title: "Writing for Robert",
    body: `
        <p>My goal with this project was to tell Robert's story in his voice, since there are only second-hand accounts of his life available. When the project began, I could only guess how he may have written based on literature and some small understanding of English culture. When I found <note ft onclick="app.openNote('letter_notes')">the leter he wrote to Hannah</note> I was able to study it and reproduce some elements of his language and writing style. While you read the journal entries, take the time to note some of these nuances:</p>
        <ul>
            <li><b>Structural:</b> part to whole relations; language relations within the text.</li>
            <li><b>Generic:</b> cross-textual relations; language relations with previous texts; genre relations. </li>
            <li><b>Medial:</b> relation of the text to its medium. This type of relation can be found regarding the letter to Hannah. Because of the nature of the letter, certain edits and explanations were made in this publication. The letter also helped to influence the writing style for Robert's fictional journal entries.</li>
            <li><b>Interpersonal:</b> relation of the texts to persons: reader, author, character, Deity, etc.</li>
            <li><b>Referential:</b> relation of the text to nature and the supernatural; real world and other world; signifier and signified.</li>
            <li><b>Silential:</b> relation of the text to what is not said; taboo; pause; omission; limitations of language.</li>
        </ul>
    `
},
{
    type: "note",
    elId: "letter_notes",
    title: "The Letter",
    body: `
        <p>Finding this letter was pivotal to writing journal entries through Robert's voice. It is the <i>only</i> text I could locate that is in his own hand, let alone his own words. Note the lack of full stops, the typographical variations, and that Robert does not often capitalize the first-person pronoun 'i'. These and other nuances in Robert's writing helped to shape the journal entries I created for him.</p>
    `
}
]