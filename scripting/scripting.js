const big_text = '<p>Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. et harum quidem rerum facilis est et expedita distinctio. nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>';
const map_embed = '<iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d787.5699534580748!2d-109.45025667165895!3d-27.195730213122822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgoogle%20maps!5e0!3m2!1sen!2sus!4v1607345150530!5m2!1sen!2sus" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>';

const demoModals = [
	() => Bonkstrap.createModal('Foo', '<p>hello world</p>'),
	() => Bonkstrap.createModal('Foo', big_text),
	() => Bonkstrap.createModalDetails('Expandable information', 'The quick brown fox jumped over the candlestick, knocking it over and ultimately causing the Great Fire of London.'),
	() => Bonkstrap.createModalRaw('<p>hello world</p>'),
	() => Bonkstrap.createModalRaw(big_text),
	() => Bonkstrap.createModalRaw(map_embed)
];

document.addEventListener('DOMContentLoaded', () => {
});
