export default function reviewForm() {
    return (
        <div>
            <h1>Review Form</h1>
            <form>
                <label htmlFor="review">Write your review:</label>
                <textarea id="review" name="review" rows="4" cols="50"></textarea>
                <br />
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
}