import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain.chains import create_retrieval_chain, create_history_aware_retriever
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from app.rag.prompts import JOHNNY_TALKS_MASTER_PROMPT

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

def run_cli():
    print("=" * 60)
    print("JOHNNY-TALKS · PERSONAL DIGITAL TWIN & CLIENT ADVISORY ENGINE")
    print("=" * 60)

    if not OPENAI_API_KEY or OPENAI_API_KEY == "your-openai-api-key-here":
        print("Notice: OPENAI_API_KEY is not set in backend/.env. Using simulated RAG chain.")
        from app.rag.chain import answer_question
        chat_history = []
        while True:
            try:
                user_input = input("\nYou: ").strip()
                if user_input.lower() in ["exit", "quit"]:
                    print("Exiting Johnny-Talks.")
                    break
                if not user_input:
                    continue
                result = answer_question(user_input, chat_history)
                print(f"\nJohnny-Talks:\n{result['answer']}")
                if result.get("sources"):
                    print("\n[VERIFIED CITATIONS]")
                    for s in result["sources"]:
                        print(f"- {s['source']} (Chunk {s.get('chunk_index', 0)})")
                chat_history.append({"role": "user", "content": user_input})
                chat_history.append({"role": "assistant", "content": result['answer']})
            except (KeyboardInterrupt, EOFError):
                break
        return

    # 1. Initialize Vector Retriever
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small", api_key=OPENAI_API_KEY)
    vector_store = Chroma(
        persist_directory="./data/chroma",
        collection_name="johnny_knowledge",
        embedding_function=embeddings
    )
    base_retriever = vector_store.as_retriever(
        search_type="mmr",
        search_kwargs={"k": 5, "fetch_k": 15, "lambda_mult": 0.5}
    )

    # 2. LLM Configuration
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2, api_key=OPENAI_API_KEY)

    # 3. Contextualize Query
    contextualize_q_system_prompt = (
        "Given a chat history and the latest user question which might reference context "
        "in the chat history, formulate a standalone question which can be understood "
        "without the chat history. Do NOT answer the question, just reformulate it if needed."
    )
    contextualize_q_prompt = ChatPromptTemplate.from_messages([
        ("system", contextualize_q_system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ])
    history_aware_retriever = create_history_aware_retriever(
        llm, base_retriever, contextualize_q_prompt
    )

    # 4. Synthesizer Chain
    qa_prompt = ChatPromptTemplate.from_messages([
        ("system", JOHNNY_TALKS_MASTER_PROMPT),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ])
    question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)

    # 5. End-to-End Johnny-Talks Agent Chain
    johnny_agent = create_retrieval_chain(history_aware_retriever, question_answer_chain)

    chat_history = []
    print("Johnny-Talks is live. Ask away (type 'exit' to quit):\n" + "-" * 50)

    while True:
        try:
            user_input = input("\nYou: ")
            if user_input.lower() in ["exit", "quit"]:
                break
            if not user_input.strip():
                continue

            result = johnny_agent.invoke({
                "input": user_input,
                "chat_history": chat_history
            })

            reply = result["answer"]
            print(f"\nJohnny-Talks:\n{reply}\n")

            chat_history.append(HumanMessage(content=user_input))
            chat_history.append(AIMessage(content=reply))
        except (KeyboardInterrupt, EOFError):
            break

if __name__ == "__main__":
    run_cli()
