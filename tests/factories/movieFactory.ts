import { faker } from '@faker-js/faker'
import {Movie} from "@/types/Movie"
import {createFactory} from "./factory"

const create = (attributes: Movie = {}): Movie => ({
  id: '1',
  title: faker.lorem.sentence({min: 1, max: 4}),
  description: faker.lorem.lines(3),
  rating: faker.number.float({min: 1, max: 9, fractionDigits: 1}).toString(),
  release_date: faker.date.future().toLocaleDateString(['en-US'], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }),
  poster_url: `https://picsum.photos/600/800`,
  backdrop_url: `https://picsum.photos/1920/1080`,
  ...attributes,
})

export default createFactory<Movie>(create)