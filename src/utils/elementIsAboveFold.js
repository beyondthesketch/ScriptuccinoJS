const elementIsAboveFold = (element) => {
    if (!(element instanceof self.Element)) {
        console && console.warn('elementIsAboveFold not supplied with a DOM element');
        return null;
    }

    return (element.getBoundingClientRect().top - self.innerHeight) < 1;
}
export default elementIsAboveFold;