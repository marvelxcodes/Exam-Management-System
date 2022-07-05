-- CreateTable
CREATE TABLE "Test" (
    "id" INT4 NOT NULL,
    "name" STRING NOT NULL,
    "date" STRING NOT NULL,
    "subject" STRING NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" INT4 NOT NULL,
    "testId" INT4 NOT NULL,
    "testName" STRING NOT NULL,
    "studentId" INT4 NOT NULL,
    "scoredMark" INT4 NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" INT4 NOT NULL,
    "question" STRING NOT NULL,
    "optionA" STRING NOT NULL,
    "optionB" STRING NOT NULL,
    "optionC" STRING NOT NULL,
    "optionD" STRING NOT NULL,
    "answer" STRING NOT NULL,
    "testId" INT4 NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" INT4 NOT NULL,
    "password" STRING NOT NULL,
    "name" STRING NOT NULL,
    "class" INT4 NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Test_id_key" ON "Test"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Result_id_key" ON "Result"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Question_id_key" ON "Question"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_id_key" ON "Student"("id");
